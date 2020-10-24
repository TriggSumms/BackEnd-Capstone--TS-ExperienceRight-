USE [master]

IF db_id('ExperienceRight') IS NULl
  CREATE DATABASE [ExperienceRight]
GO

USE [ExperienceRight]
GO
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Business];
DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Frequency];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO


CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ProfileImageLocation] nvarchar(255),
  [UserTypeId] integer NOT NULL,

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Frequency] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)
CREATE TABLE [Business] (
  [Id] integer PRIMARY KEY IDENTITY,
  [EstablishmentName] nvarchar(255) NOT NULL,
  [Bio] text NOT NULL,
  [Address] nvarchar(255),
  [HoursOfOperation] nvarchar(255),
  [Phone] nvarchar(255),
  [CategoryId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Business_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Business_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])

)

CREATE TABLE [Review] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [DateofExperience] datetime,
  [Rating] integer NOT NULL,
  [FrequencyId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [BusinessId] integer NOT NULL,

  CONSTRAINT [FK_Review_Frequency] FOREIGN KEY ([FrequencyId]) REFERENCES [Frequency] ([Id]),
  CONSTRAINT [FK_Review_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Review_Business] FOREIGN KEY ([BusinessId]) REFERENCES [Business] ([Id])

)



CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ReviewId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Subject] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreateDateTime] datetime NOT NULL,

  CONSTRAINT [FK_Comment_Review] FOREIGN KEY ([ReviewId]) REFERENCES [Review] ([Id]),
  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO