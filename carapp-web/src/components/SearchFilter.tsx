import React, { useState } from 'react';

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
  const [searchType, setSearchType] = useState<string>('plateNumber');
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = () => {
    if (!searchValue.trim()) {
      onReset();
      return;
    }

    const params: any = {};
    if (searchType === 'year') {
      params.year = parseInt(searchValue);
    } else {
      params[searchType] = searchValue;
    }
    onSearch(params);
  };

  const handleReset = () => {
    setSearchValue('');
    onReset();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
            onChange={(e) => setSearchType(e.target.value)}
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
