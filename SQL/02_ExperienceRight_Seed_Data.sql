USE [ExperienceRight];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Business'), (2, 'AnomynousReviewer');

set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime,  ProfileImageLocation, UserTypeId, FirebaseUserId) values (1, 'tfigiovanni5', 'Tobi', 'Figiovanni', 'tfigiovanni5@baidu.comx', '2019-10-17', 'https://robohash.org/quiundedignissimos.png?size=150x150&set=set1', 2, 'xiybslspeizewvkixqubnqjlwamz');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime,  ProfileImageLocation, UserTypeId, FirebaseUserId) values (2, 'tfigiovanni5', 'Tobin', 'Figiovanni', 'tfigiov5@baidu.comx', '2019-10-17', 'https://robohash.org/quiundedignissimos.png?size=150x150&set=set1', 1, 'xiybslspeizewvkixqubnqjlwazh');
set identity_insert [UserProfile] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Finance'), (2, 'Goverment'), (3, 'Education'), (4, 'Food & Beverage'), (5, 'Music'),
	   (6, 'Transportation'), (7, 'Construction & Repairs'), (8, 'Legal'), (9, 'Healthcare'), (10, 'Outdoor Activities'), (11, 'Indoor Activities')

set identity_insert [Category] off

set identity_insert [Frequency] on
insert into [Frequency] ([Id], [Name])
values (1, 'Once a Day'), (2, 'Once a Week'), (3, 'Once a Month'), (4, 'Once or Twice a Month'),(5, 'A Few Times a Year'), (6, 'Often.'), (7, 'FirstTime Visiting'), (8, 'Never Visited');

set identity_insert [Frequency] off

set identity_insert [Business] on
insert into Business (Id, EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId) values (1, 'CoolsGuysCompany', 'full of a couple hunks', '55 Sandwith road 37209 Nashville TN', '3:00 to 5:00pm', '931-344-5670', 2, 2);


set identity_insert [Business] off

set identity_insert [Review] on
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (1, 'morph front-end markets', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-08-01', '2019-12-04', 4, 1, 1, 1);
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (2, 'yeetyes', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-09-01', '2019-12-05', 5, 3, 1, 1);
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (3, 'okay', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-09-01', '2019-12-04', 10, 2, 1, 1);

set identity_insert [Review] off

set identity_insert [Comment] on
insert into Comment (Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime) values (1, 1, 2, 'Sed sagittis.', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2020-05-19');
insert into Comment (Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime) values (2, 1, 2, 'Pellentesque viverra pede ac diam.', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '2020-05-11');

set identity_insert [Comment] off