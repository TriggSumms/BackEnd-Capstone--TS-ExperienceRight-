USE [ExperienceRight];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'BusinessUser'), (2, 'AnomynousUser');

set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (1, 'rsandwith0', 'Reina', 'Sandwith', 'rsandwith0@google.com.brx', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 1, 'jpuhyzaicsokywncxveknzowfpdu');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (2, 'rdo1', 'Red', 'Do', 'rdo1@timesonline.co.ukx', '2020-04-20', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 2, 'vhbgqyeqelhgkohutnoglbdohssl');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (3, 'aotton2', 'Arnold', 'Otton', 'aotton2@ow.lyx', '2020-01-13', 'https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1', 1, 'wqhvgdjxjqkqecuridpvjtwpoacc');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (4, 'agrzeskowski3', 'Aharon', 'Grzeskowski', 'agrzeskowski3@fc2.comx', '2020-04-12', 'https://robohash.org/doloremfugiatrerum.png?size=150x150&set=set1', 1, 'exsjcqvnhydjofznqmtvecekcgno');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (5, 'ryakushkev4', 'Rosana', 'Yakushkev', 'ryakushkev4@weibo.comx', '2019-08-16', 'https://robohash.org/deseruntutipsum.png?size=150x150&set=set1', 1, 'djwoicosfnhexpmmsnukgcsbnqod');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (6, 'tfigiovanni5', 'Tobi', 'Figiovanni', 'tfigiovanni5@baidu.comx', '2019-10-17', 'https://robohash.org/quiundedignissimos.png?size=150x150&set=set1', 2, 'xiybslspeizewvkixqubnqjlwamz');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (7, 'gteanby6', 'Giuseppe', 'Teanby', 'gteanby6@craigslist.orgx', '2019-08-29', 'https://robohash.org/hicnihilipsa.png?size=150x150&set=set1', 1, 'lzxmysyzqrmcwjzxsyrkbczhspup');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (8, 'cvanderweedenburg7', 'Cristabel', 'Van Der Weedenburg', 'cvanderweedenburg7@wikimedia.orgx', '2019-11-02', 'https://robohash.org/quidemearumtenetur.png?size=150x150&set=set1', 1, 'jqqyiksxkocmhphkylikwcehuvky');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (9, 'ecornfoot8', 'Emmaline', 'Cornfoot', 'ecornfoot8@cargocollective.comx', '2020-02-17', 'https://robohash.org/blanditiismaioresest.png?size=150x150&set=set1', 2, 'smzswoscvmfpvugpmgvkflihdmka');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ProfileImageLocation, UserTypeId, FirebaseUserId) values (10, 'jmaruska9', 'Jody', 'Maruska', 'jmaruska9@netscape.comx', '2020-02-09', 'https://robohash.org/voluptatemexercitationemdignissimos.png?size=150x150&set=set1', 1, 'abcnibyohfhukxngaegjxxzionyt');

set identity_insert [UserProfile] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Finance'), (2, 'Goverment'), (3, 'Education'), (4, 'Food & Beverage'), (5, 'Music'),
	   (6, 'Transportation'), (7, 'Construction & Repairs'), (8, 'Legal & Accounting'), (9, 'Healthcare')

set identity_insert [Category] off

set identity_insert [Frequency] on
insert into [Frequency] ([Id], [Name])
values (1, 'Once'), (2, 'Twice'), (3, 'Threes'), (4, 'Fours');

set identity_insert [Frequency] off

set identity_insert [Business] on
insert into Business (Id, EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId) values (1, 'CoolsGuysCompany', 'full of a couple hunks', '55 Sandwith road 37209 Nashville TN', '3:00 to 5:00pm', '931-344-5670', 1, 2);
insert into Business (Id, EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId) values (2, 'CoolsGirlsCompany', 'hunks again', '57 Sandwith road 37209 Nashville TN', '3:00 to 5:00pm', '931-346-5670', 3, 3);
insert into Business (Id, EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId) values (3, 'CoolsCompany', 'hunks.', '56 Sandwith road 37209 Nashville TN', '3:00 to 5:00pm', '931-345-5670', 2, 4);

set identity_insert [Business] off

set identity_insert [Review] on
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (1, 'morph front-end markets', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-08-01', '2019-12-04', 4, 1, 3, 2);
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (2, 'yeetyes', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-09-01', '2019-12-05', 5, 3, 2, 3);
insert into Review (Id, Title, Content, CreateDateTime, DateOfExperience, Rating, FrequencyId, UserProfileId, BusinessId) values (3, 'okay', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '2019-09-01', '2019-12-04', 10, 2, 1, 1);

set identity_insert [Review] off

set identity_insert [Comment] on
insert into Comment (Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime) values (1, 1, 3, 'Sed sagittis.', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2020-05-19');
insert into Comment (Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime) values (2, 1, 3, 'Pellentesque viverra pede ac diam.', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '2020-05-11');

set identity_insert [Comment] off