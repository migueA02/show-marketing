"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Country = {
  code: string;
  name: string;
  dialCode: string;
  flagEmoji: string;
  flagImage: string;
};

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

const FALLBACK_COUNTRIES: Country[] = [
  { code: "CR", name: "Costa Rica", dialCode: "+506", flagEmoji: "🇨🇷", flagImage: "" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flagEmoji: "🇺🇸", flagImage: "" },
  { code: "MX", name: "Mexico", dialCode: "+52", flagEmoji: "🇲🇽", flagImage: "" },
  { code: "CO", name: "Colombia", dialCode: "+57", flagEmoji: "🇨🇴", flagImage: "" },
  { code: "AR", name: "Argentina", dialCode: "+54", flagEmoji: "🇦🇷", flagImage: "" },
  { code: "ES", name: "Espana", dialCode: "+34", flagEmoji: "🇪🇸", flagImage: "" },
  { code: "PA", name: "Panama", dialCode: "+507", flagEmoji: "🇵🇦", flagImage: "" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flagEmoji: "🇬🇹", flagImage: "" },
  { code: "HN", name: "Honduras", dialCode: "+504", flagEmoji: "🇭🇳", flagImage: "" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flagEmoji: "🇳🇮", flagImage: "" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flagEmoji: "🇸🇻", flagImage: "" },
  { code: "DO", name: "Republica Dominicana", dialCode: "+1", flagEmoji: "🇩🇴", flagImage: "" },
];

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=cca2,name,idd,flag,flags";

function countryCodeToFlagEmoji(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) {
    return "🌍";
  }

  const offset = 127397;
  return String.fromCodePoint(...code.split("").map((char) => char.charCodeAt(0) + offset));
}

function buildDialCode(idd?: { root?: string; suffixes?: string[] }): string {
  if (!idd?.root) {
    return "";
  }

  const suffix = idd.suffixes?.[0] || "";
  return `${idd.root}${suffix}`.trim();
}

function mapApiCountries(items: RestCountryApiItem[]): Country[] {
  return items
    .map((item) => {
      const code = item.cca2?.toUpperCase() || "";
      const name = item.name?.common || "";
      const dialCode = buildDialCode(item.idd);
      const flagEmoji = item.flag || countryCodeToFlagEmoji(code);
      const flagImage = item.flags?.svg || item.flags?.png || "";

      if (!code || !name || !dialCode) {
        return null;
      }

      return { code, name, dialCode, flagEmoji, flagImage };
    })
    .filter((country): country is Country => Boolean(country))
    .sort((a, b) => a.name.localeCompare(b.name));
}

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

  const getCountryByCode = (code: string) =>
    countries.find((country) => country.code === code) || countries[0];

  const selectedCountry = getCountryByCode(selectedCountryCode);

  const filteredCountries = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return countries;
    }

    return countries.filter((country) => {
      const searchable = `${country.name} ${country.code} ${country.dialCode}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [countries, searchText]);

  const findCountryByPhone = (phone: string): Country => {
    const normalized = phone.trim();
    const sortedByDialLength = [...countries].sort(
      (a, b) => b.dialCode.length - a.dialCode.length
    );
    return (
      sortedByDialLength.find((country) => normalized.startsWith(country.dialCode)) ||
      countries[0]
    );
  };

  const emitPhoneValue = (countryCode: string, localValue: string) => {
    const country = getCountryByCode(countryCode);
    const normalizedLocal = localValue.trim();
    if (!normalizedLocal) {
      onChange("");
      return;
    }
    onChange(`${country.dialCode} ${normalizedLocal}`.trim());
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadCountries = async () => {
      try {
        const response = await fetch(REST_COUNTRIES_URL, {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as RestCountryApiItem[];
        const mappedCountries = mapApiCountries(data);

        if (mappedCountries.length > 0) {
          setCountries(mappedCountries);
        }
      } catch {
        // Fallback local ya cargado; no se requiere accion adicional.
      }
    };

    loadCountries();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!countries.length) {
      return;
    }

    if (!value.trim()) {
      const defaultCountry = countries.find((country) => country.code === "CR") || countries[0];
      setSelectedCountryCode(defaultCountry.code);
      setLocalPhone("");
      return;
    }

    const matchedCountry = findCountryByPhone(value);
    const localValue = value.replace(matchedCountry.dialCode, "").trim();
    setSelectedCountryCode(matchedCountry.code);
    setLocalPhone(localValue);
  }, [value, countries]);

  const handleCountryChange = (nextCode: string) => {
    setSelectedCountryCode(nextCode);
    emitPhoneValue(nextCode, localPhone);
    setIsOpen(false);
    setSearchText("");
  };

  const handleLocalPhoneChange = (nextValue: string) => {
    setLocalPhone(nextValue);
    emitPhoneValue(selectedCountryCode, nextValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${containerClassName} relative`}>
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
        <div className="absolute z-50 mt-1 w-[280px] max-w-full rounded-md border border-black/20 bg-white shadow-lg">
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
        placeholder={placeholder}
        aria-label={phoneAriaLabel}
        required={required}
        className={inputClassName}
      />
    </div>
  );
}