USE [master];
GO

IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'carapp_user')
BEGIN
    CREATE LOGIN [carapp_user] WITH PASSWORD = 'Password123*';
END

USE [carapp_db];
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'carapp_user')
BEGIN
    CREATE USER [carapp_user] FOR LOGIN [carapp_user];
    ALTER ROLE db_owner ADD MEMBER [carapp_user];
END
GO
