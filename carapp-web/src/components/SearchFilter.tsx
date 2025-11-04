import React, { useState, useRef } from 'react';

type SearchParams = {
  plateNumber?: string;
  model?: string;
  year?: number;
  brand?: string;
};

type SearchType = keyof SearchParams;

interface SearchFilterProps {
  onSearch: (params: {
    plateNumber?: string;
    model?: string;
    year?: number;
    brand?: string;
  }) => void;
  onReset: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onReset }) => {
  const [searchType, setSearchType] = useState<SearchType>('plateNumber');
  const [searchValue, setSearchValue] = useState<string>('');
  const lastSearchRef = useRef<string>('');

  const handleSearch = () => {
    const trimSearchValue = searchValue.trim();

    if (!trimSearchValue) {
      return;
    }

    if (lastSearchRef.current === trimSearchValue) {
      return;
    }

    const params: SearchParams = {};
    if (searchType === 'year') {
      const parsed = parseInt(trimSearchValue);
      if (Number.isNaN(parsed)) {
        return;
      }
      params.year = parsed;
    } else {
      params[searchType] = trimSearchValue;
    }

    lastSearchRef.current = trimSearchValue;
    onSearch(params);
  };

  const handleReset = () => {
    if (!searchValue) {
      return;
    }
    setSearchValue('');
    lastSearchRef.current = '';
    onReset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SearchType;
    setSearchType(value);
    setSearchValue('');
    lastSearchRef.current = '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="mb-2">
        <p
          className="text-blue-600 font-medium text-sm"
        >
          Filtros
        </p>
      </div>


      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={searchType}
            onChange={handleTypeChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="plateNumber">Buscar por Placa</option>
            <option value="model">Buscar por Modelo</option>
            <option value="year">Buscar por Año</option>
            <option value="brand">Buscar por Marca</option>
          </select>

          <input
            type={searchType === 'year' ? 'number' : 'text'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ingresa ${
              searchType === 'plateNumber'
                ? 'la placa'
                : searchType === 'model'
                ? 'el modelo'
                : searchType === 'year'
                ? 'el año'
                : 'la marca'
            }`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              Buscar
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium whitespace-nowrap"
            >
              Limpiar
            </button>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default SearchFilter;
