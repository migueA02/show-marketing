"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getExampleNumber, parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

/** Registro de país normalizado utilizado en todo el componente. */
type Country = {
  code: string;
  name: string;
  dialCode: string;
  flagEmoji: string;
  flagImage: string;
};

/** Forma cruda devuelta por la API de restcountries.com v3.1 para los campos solicitados. */
type RestCountryApiItem = {
  cca2?: string;
  flag?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  name?: {
    common?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
};

/** Lista fija de países comunes mostrada de inmediato mientras carga la API. */
const FALLBACK_COUNTRIES: Country[] = [
  { code: "CR", name: "Costa Rica",          dialCode: "+506", flagEmoji: "🇨🇷", flagImage: "" },
  { code: "US", name: "Estados Unidos",      dialCode: "+1",   flagEmoji: "🇺🇸", flagImage: "" },
  { code: "MX", name: "Mexico",              dialCode: "+52",  flagEmoji: "🇲🇽", flagImage: "" },
  { code: "CO", name: "Colombia",            dialCode: "+57",  flagEmoji: "🇨🇴", flagImage: "" },
  { code: "AR", name: "Argentina",           dialCode: "+54",  flagEmoji: "🇦🇷", flagImage: "" },
  { code: "ES", name: "Espana",              dialCode: "+34",  flagEmoji: "🇪🇸", flagImage: "" },
  { code: "PA", name: "Panama",              dialCode: "+507", flagEmoji: "🇵🇦", flagImage: "" },
  { code: "GT", name: "Guatemala",           dialCode: "+502", flagEmoji: "🇬🇹", flagImage: "" },
  { code: "HN", name: "Honduras",            dialCode: "+504", flagEmoji: "🇭🇳", flagImage: "" },
  { code: "NI", name: "Nicaragua",           dialCode: "+505", flagEmoji: "🇳🇮", flagImage: "" },
  { code: "SV", name: "El Salvador",         dialCode: "+503", flagEmoji: "🇸🇻", flagImage: "" },
  { code: "DO", name: "Republica Dominicana",dialCode: "+1",   flagEmoji: "🇩🇴", flagImage: "" },
];

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=cca2,name,idd,flag,flags";

/**
 * Convierte un código ISO 3166-1 alfa-2 en el emoji de bandera correspondiente.
 *
 * @param code - Código de país en mayúsculas de dos letras (por ejemplo, "CR")
 * @returns Emoji de bandera del país, o "🌍" si el código no es válido
 */
function countryCodeToFlagEmoji(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return "🌍";
  const offset = 127397;
  return String.fromCodePoint(...code.split("").map((c) => c.charCodeAt(0) + offset));
}

/**
 * Concatena la raíz IDD y el primer sufijo en una cadena de código de marcación.
 *
 * @param idd - Objeto IDD de la API con `root` y `suffixes` opcionales
 * @returns Cadena de código de marcación, o cadena vacía si no hay raíz
 */
function buildDialCode(idd?: { root?: string; suffixes?: string[] }): string {
  if (!idd?.root) return "";
  const suffix = idd.suffixes?.[0] || "";
  return `${idd.root}${suffix}`.trim();
}

/**
 * Transforma el arreglo crudo de la API en registros Country ordenados.
 *
 * @param items - Arreglo de elementos crudos devueltos por restcountries
 * @returns Arreglo de registros Country válidos ordenados alfabéticamente
 */
function mapApiCountries(items: RestCountryApiItem[]): Country[] {
  return items
    .map((item) => {
      const code = item.cca2?.toUpperCase() || "";
      const name = item.name?.common || "";
      const dialCode = buildDialCode(item.idd);
      const flagEmoji = item.flag || countryCodeToFlagEmoji(code);
      const flagImage = item.flags?.svg || item.flags?.png || "";
      if (!code || !name || !dialCode) return null;
      return { code, name, dialCode, flagEmoji, flagImage };
    })
    .filter((c): c is Country => Boolean(c))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Devuelve el número de ejemplo en formato nacional para el país dado.
 * Usa la base de datos móvil de libphonenumber-js (datos de Google).
 *
 * @param code - Código ISO 3166-1 alfa-2 del país
 * @returns Cadena de ejemplo formateada, o cadena vacía si no existe
 */
function getPhoneExample(code: string): string {
  try {
    const example = getExampleNumber(code as CountryCode, examples as never);
    return example ? example.formatNational() : "";
  } catch {
    return "";
  }
}

/**
 * Valida la parte local del número contra la base de datos de libphonenumber-js.
 *
 * @param local - Valor local ingresado por el usuario
 * @param countryCode - Código del país actualmente seleccionado
 * @returns Mensaje de error o cadena vacía si es válido
 */
function validatePhone(local: string, countryCode: string): string {
  if (!local.trim()) return "";
  try {
    const parsed = parsePhoneNumberFromString(local, countryCode as CountryCode);
    if (!parsed?.isValid()) {
      const hint = getPhoneExample(countryCode);
      return hint ? `Formato esperado: ${hint}` : "Número inválido para este país";
    }
  } catch {
    const hint = getPhoneExample(countryCode);
    return hint ? `Formato esperado: ${hint}` : "Número inválido para este país";
  }
  return "";
}


/** Props de CountryPhoneInput — el llamador controla el valor y recibe "+codigoPais numeroLocal" en onChange. */
type CountryPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  countryAriaLabel?: string;
  phoneAriaLabel?: string;
  containerClassName: string;
  selectClassName: string;
  inputClassName: string;
};

/**
 * Selector de código de país combinado con campo de número local.
 * Valida el número usando libphonenumber-js y muestra un ejemplo real del país seleccionado.
 */
export default function CountryPhoneInput({
  value,
  onChange,
  placeholder,
  required = false,
  countryAriaLabel = "Codigo de pais",
  phoneAriaLabel = "Numero de telefono",
  containerClassName,
  selectClassName,
  inputClassName,
}: CountryPhoneInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<Country[]>(FALLBACK_COUNTRIES);
  const [selectedCountryCode, setSelectedCountryCode] = useState("CR");
  const [localPhone, setLocalPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formatError, setFormatError] = useState("");

  const getCountryByCode = (code: string) =>
    countries.find((c) => c.code === code) || countries[0];

  const selectedCountry = getCountryByCode(selectedCountryCode);

  const filteredCountries = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((c) =>
      `${c.name} ${c.code} ${c.dialCode}`.toLowerCase().includes(query)
    );
  }, [countries, searchText]);

  const findCountryByPhone = (phone: string): Country => {
    const normalized = phone.trim();
    const sorted = [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length);
    return sorted.find((c) => normalized.startsWith(c.dialCode)) || countries[0];
  };

  const emitPhoneValue = (countryCode: string, localValue: string) => {
    const country = getCountryByCode(countryCode);
    const normalized = localValue.trim();
    onChange(normalized ? `${country.dialCode} ${normalized}`.trim() : "");
  };

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(REST_COUNTRIES_URL, {
          signal: controller.signal,
          cache: "force-cache",
        });
        if (!res.ok) return;
        const data = (await res.json()) as RestCountryApiItem[];
        const mapped = mapApiCountries(data);
        if (mapped.length > 0) setCountries(mapped);
      } catch {
        // Fallback local ya cargado.
      }
    };
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!countries.length) return;
    if (!value.trim()) {
      const def = countries.find((c) => c.code === "CR") || countries[0];
      setSelectedCountryCode(def.code);
      setLocalPhone("");
      setFormatError("");
      return;
    }
    const matched = findCountryByPhone(value);
    setSelectedCountryCode(matched.code);
    setLocalPhone(value.replace(matched.dialCode, "").trim());
  }, [value, countries]);

  const handleCountryChange = (nextCode: string) => {
    setSelectedCountryCode(nextCode);
    emitPhoneValue(nextCode, localPhone);
    setIsOpen(false);
    setSearchText("");
    setFormatError(validatePhone(localPhone, nextCode));
  };

  const handleLocalPhoneChange = (nextValue: string) => {
    setLocalPhone(nextValue);
    emitPhoneValue(selectedCountryCode, nextValue);
    setFormatError(validatePhone(nextValue, selectedCountryCode));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentPlaceholder = useMemo(
    () => getPhoneExample(selectedCountryCode) || placeholder,
    [selectedCountryCode, placeholder]
  );

  return (
    <div ref={containerRef}>
      <div className={`${containerClassName} relative`}>
        <button
          type="button"
          className={selectClassName}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={countryAriaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="flex items-center gap-2 truncate">
            {selectedCountry.flagImage ? (
              <img
                src={selectedCountry.flagImage}
                alt=""
                className="w-5 h-4 object-cover rounded-sm"
                aria-hidden="true"
              />
            ) : (
              <span aria-hidden="true">{selectedCountry.flagEmoji}</span>
            )}
            <span>{selectedCountry.dialCode}</span>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 left-0 top-full mt-1 w-[280px] max-w-full rounded-md border border-black/20 bg-white shadow-lg">
            <div className="p-2 border-b border-black/10">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Buscar pais o codigo"
                aria-label="Buscar pais"
                className="w-full rounded-md border border-black/20 px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <ul className="max-h-56 overflow-auto" role="listbox" aria-label={countryAriaLabel}>
              {filteredCountries.map((country) => (
                <li key={`${country.code}-${country.dialCode}`}>
                  <button
                    type="button"
                    onClick={() => handleCountryChange(country.code)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-black/5 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {country.flagImage ? (
                        <img
                          src={country.flagImage}
                          alt=""
                          className="w-5 h-4 object-cover rounded-sm"
                          aria-hidden="true"
                        />
                      ) : (
                        <span aria-hidden="true">{country.flagEmoji}</span>
                      )}
                      <span className="truncate text-black">{country.name}</span>
                    </span>
                    <span className="text-black/70">{country.dialCode}</span>
                  </button>
                </li>
              ))}
              {filteredCountries.length === 0 && (
                <li className="px-3 py-2 text-sm text-black/60">Sin resultados</li>
              )}
            </ul>
          </div>
        )}

        <input
          type="tel"
          value={localPhone}
          onChange={(e) => handleLocalPhoneChange(e.target.value)}
          placeholder={currentPlaceholder}
          aria-label={phoneAriaLabel}
          aria-describedby={formatError ? "phone-format-error" : undefined}
          required={required}
          className={`${inputClassName} ${formatError ? "ring-2 ring-red-400 border-red-400" : ""}`}
        />
      </div>

      {formatError && (
        <p id="phone-format-error" className="mt-1 text-xs text-red-500 font-medium" role="alert">
          {formatError}
        </p>
      )}
    </div>
  );
}
