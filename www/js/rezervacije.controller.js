angular.module('TicketsApp')
.controller('RezervacijeCtrl', function($scope, $http) {
	var vm = this;
	$scope.zdravo = 'Zdravo!!!';

	vm.ulogovanKorisnik = {	
		username: "frodo",
		type: 	"user",
		name: 	"Frodo Baggins",
		img: 		"https://vignette.wikia.nocookie.net/p__/images/b/b4/FRODO.jpg/revision/latest?cb=20120124180422&path-prefix=protagonist",
		rezervacije: [
			{
				type: "Parter",
				price: 4950,
				count: 2,
				totalPrice: 9900,
				event: {
					_id: 1,
					date: "12.12.2018.",
					artist: "Guns n Roses",
					location: {
						city: "Novi Sad",
						venue: "Quarter",
						lat: 25,
						lng: 80
					},
					photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRz5Lk95lylTy2gHKiFV49wN4GJHW3c9tMRUt-L1h4mpCmi4X_",
					description: "Guns N' Roses, often abbreviated as GNR, is an American hard rock band from Los Angeles, California, formed in 1985. The lineup, when first signed to Geffen Records in 1986, consisted of vocalist Axl Rose, lead guitarist Slash, rhythm guitarist Izzy Stradlin, bassist Duff McKagan, and drummer Steven Adler. Guns N' Roses has released six studio albums, accumulating sales of more than 100 million records worldwide, including 45 million in the United States, making them the 41st best-selling artist of all time.",
					poster: "https://images-na.ssl-images-amazon.com/images/I/51FN%2B-6mMtL._SX351_BO1,204,203,200_.jpg"
					}
			},
			{
				type: "Parter",
				price: 3500,
				count: 2,
				totalPrice: 7000,
				event: {
					_id: 17,
					date: "10.7.2018.",
					artist: "Scorpions",
					location: {
						city: "Beograd",
						venue: "Arena",
						lat: 40,
						lng: 73
					},
					photo: "http://logosolusa.com/wp-content/uploads/parser/Scorpions-Logo-1.jpg",
					description: "50 years have gone by since the days the juvenile Klaus Meine, Rudolf Schenker and Matthias Jabs wandered the streets of Hannover, which was just awakening from post war paralysis, with a barrow carrying their instruments and amplifiers. In these 50 years, they have become Germany’s, or rather Continental Europe’s most successful rock band, the living proof that not only VW, Mercedes or BMW are able to compete internationally, but classic rock music made in Germany as well. Countless bands, including the Smashing Pumpkins as well as Green Day, Korn, System Of A Down or Queensryche have covered songs by the Scorpions throughout the years. “Rock You Like A Hurricane” on its own was covered over 150 times by different musicians.",
					poster: "https://files.geometria.ru/pics/original/060/647/60647644.jpg"
					}
			}
		]
	};

	vm.ulogovanKorisnik.name = "pera peric";

	vm.rezervacije = [
			{
				type: "Parter",
				price: 4950,
				count: 2,
				totalPrice: 9900,
				event: {
					_id: 1,
					date: "12.12.2018.",
					artist: "Guns n Roses",
					location: {
						city: "Novi Sad",
						venue: "Quarter",
						lat: 25,
						lng: 80
					},
					photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRz5Lk95lylTy2gHKiFV49wN4GJHW3c9tMRUt-L1h4mpCmi4X_",
					description: "Guns N' Roses, often abbreviated as GNR, is an American hard rock band from Los Angeles, California, formed in 1985. The lineup, when first signed to Geffen Records in 1986, consisted of vocalist Axl Rose, lead guitarist Slash, rhythm guitarist Izzy Stradlin, bassist Duff McKagan, and drummer Steven Adler. Guns N' Roses has released six studio albums, accumulating sales of more than 100 million records worldwide, including 45 million in the United States, making them the 41st best-selling artist of all time.",
					poster: "https://images-na.ssl-images-amazon.com/images/I/51FN%2B-6mMtL._SX351_BO1,204,203,200_.jpg"
					}
			},
			{
				type: "Parter",
				price: 3500,
				count: 2,
				totalPrice: 7000,
				event: {
					_id: 17,
					date: "10.7.2018.",
					artist: "Scorpions",
					location: {
						city "Beograd",
						venue "Arena",
						lat: 40,
						lng: 73
					},
					photo: "http://logosolusa.com/wp-content/uploads/parser/Scorpions-Logo-1.jpg",
					description: "50 years have gone by since the days the juvenile Klaus Meine, Rudolf Schenker and Matthias Jabs wandered the streets of Hannover, which was just awakening from post war paralysis, with a barrow carrying their instruments and amplifiers. In these 50 years, they have become Germany’s, or rather Continental Europe’s most successful rock band, the living proof that not only VW, Mercedes or BMW are able to compete internationally, but classic rock music made in Germany as well. Countless bands, including the Smashing Pumpkins as well as Green Day, Korn, System Of A Down or Queensryche have covered songs by the Scorpions throughout the years. “Rock You Like A Hurricane” on its own was covered over 150 times by different musicians.",
					poster: "https://files.geometria.ru/pics/original/060/647/60647644.jpg"
					}
			}
		];
});