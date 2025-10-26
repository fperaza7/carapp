#!/bin/bash
set -e

echo "Iniciando SQL Server..."

# Iniciar el servidor en segundo plano
/opt/mssql/bin/sqlservr &

echo "⏳ Esperando a que SQL Server esté disponible..."
until /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -Q "SELECT 1" -b -C > /dev/null 2>&1
do
  sleep 3
done

echo "SQL Server disponible! Ejecutando scripts de inicialización..."

# Ejecutar todos los .sql que existan en /init/sql (por orden alfabético)
for script in /init/sql/*.sql; do
  echo "Ejecutando $script..."
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -d master -i "$script" -C
done

echo "Inicialización completa. Manteniendo SQL Server activo..."
wait