IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'carapp_db')
BEGIN
    CREATE DATABASE carapp_db;
END
GO