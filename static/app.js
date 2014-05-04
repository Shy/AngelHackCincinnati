/*


// Declare app level module which depends on filters, and services
angular.module('bttr', [
	'ngRoute',
	'bttr.controllers'
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'index.html', controller: 'bttrController'})
}]);

angular.module('bttr.controllers')
.controller('bttrController', ['$scope',function($scope) {

	$scope.wordcloud = function() {
		console.log("test");
		var fill = d3.scale.category20();
		
		var url="http://angelhackcincinnati.herokuapp.com/apiexample?callback=?";
		$.getJSON(url,function(data){

			var words=$.map(data,function(d,idx) {return d.text.split(" ")});
			console.log(words);
			d3.layout.cloud().size([300, 300])
			.words(words.map(function(d) {
				return {text: d, size: 10 + Math.random() * 90};
			}))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();
		}).done(function() {
			console.log( "second success" );
		})
		.fail(function(jqxhr, textStatus, error) {
			console.log( textStatus+" "+error);
		})
		.always(function() {
			console.log( "complete" );
		});



		function draw(words) {
			d3.select("body").append("svg")
			.attr("width", 300)
			.attr("height", 300)
			.append("g")
			.attr("transform", "translate(150,150)")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})

			.text(function(d) { return d.text; });
		}
	};
	$scope.whatever =function (){
		$scope.doh = "test";
		alert($scope.doh)
	};



}
]);

*/

function bttrController ($scope)
{
	var stop =
	["a",
	"able",
	"about",
	"above",
	"abst",
	"accordance",
	"according",
	"accordingly",
	"across",
	"act",
	"actually",
	"added",
	"adj",
	"affected",
	"affecting",
	"affects",
	"after",
	"afterwards",
	"again",
	"against",
	"ah",
	"all",
	"almost",
	"alone",
	"along",
	"already",
	"also",
	"although",
	"always",
	"am",
	"among",
	"amongst",
	"an",
	"and",
	"announce",
	"another",
	"any",
	"anybody",
	"anyhow",
	"anymore",
	"anyone",
	"anything",
	"anyway",
	"anyways",
	"anywhere",
	"apparently",
	"approximately",
	"are",
	"aren",
	"arent",
	"arise",
	"around",
	"as",
	"aside",
	"ask",
	"asking",
	"at",
	"auth",
	"available",
	"away",
	"awfully",
	"b",
	"back",
	"be",
	"became",
	"because",
	"become",
	"becomes",
	"becoming",
	"been",
	"before",
	"beforehand",
	"begin",
	"beginning",
	"beginnings",
	"begins",
	"behind",
	"being",
	"believe",
	"below",
	"beside",
	"besides",
	"between",
	"beyond",
	"biol",
	"both",
	"brief",
	"briefly",
	"but",
	"by",
	"c",
	"ca",
	"came",
	"can",
	"cannot",
	"can't",
	"cause",
	"causes",
	"certain",
	"certainly",
	"co",
	"com",
	"come",
	"comes",
	"contain",
	"containing",
	"contains",
	"could",
	"couldnt",
	"d",
	"date",
	"did",
	"didn't",
	"different",
	"do",
	"does",
	"doesn't",
	"doing",
	"done",
	"don't",
	"down",
	"downwards",
	"due",
	"during",
	"e",
	"each",
	"ed",
	"edu",
	"effect",
	"eg",
	"eight",
	"eighty",
	"either",
	"else",
	"elsewhere",
	"end",
	"ending",
	"enough",
	"especially",
	"et",
	"et-al",
	"etc",
	"even",
	"ever",
	"every",
	"everybody",
	"everyone",
	"everything",
	"everywhere",
	"ex",
	"except",
	"f",
	"far",
	"few",
	"ff",
	"fifth",
	"first",
	"five",
	"fix",
	"followed",
	"following",
	"follows",
	"for",
	"former",
	"formerly",
	"forth",
	"found",
	"four",
	"from",
	"further",
	"furthermore",
	"g",
	"gave",
	"get",
	"gets",
	"getting",
	"give",
	"given",
	"gives",
	"giving",
	"go",
	"goes",
	"gone",
	"got",
	"gotten",
	"h",
	"had",
	"happens",
	"hardly",
	"has",
	"hasn't",
	"have",
	"haven't",
	"having",
	"he",
	"hed",
	"hence",
	"her",
	"here",
	"hereafter",
	"hereby",
	"herein",
	"heres",
	"hereupon",
	"hers",
	"herself",
	"hes",
	"hi",
	"hid",
	"him",
	"himself",
	"his",
	"hither",
	"home",
	"how",
	"howbeit",
	"however",
	"hundred",
	"i",
	"id",
	"ie",
	"if",
	"i'll",
	"im",
	"immediate",
	"immediately",
	"importance",
	"important",
	"in",
	"inc",
	"indeed",
	"index",
	"information",
	"instead",
	"into",
	"invention",
	"inward",
	"is",
	"isn't",
	"it",
	"itd",
	"it'll",
	"its",
	"itself",
	"i've",
	"j",
	"just",
	"k",
	"keep",
	"keeps",
	"kept",
	"kg",
	"km",
	"know",
	"known",
	"knows",
	"l",
	"largely",
	"last",
	"lately",
	"later",
	"latter",
	"latterly",
	"least",
	"less",
	"lest",
	"let",
	"lets",
	"like",
	"liked",
	"likely",
	"line",
	"little",
	"'ll",
	"look",
	"looking",
	"looks",
	"ltd",
	"m",
	"made",
	"mainly",
	"make",
	"makes",
	"many",
	"may",
	"maybe",
	"me",
	"mean",
	"means",
	"meantime",
	"meanwhile",
	"merely",
	"mg",
	"might",
	"million",
	"miss",
	"ml",
	"more",
	"moreover",
	"most",
	"mostly",
	"mr",
	"mrs",
	"much",
	"mug",
	"must",
	"my",
	"myself",
	"n",
	"na",
	"name",
	"namely",
	"nay",
	"nd",
	"near",
	"nearly",
	"necessarily",
	"necessary",
	"need",
	"needs",
	"neither",
	"never",
	"nevertheless",
	"new",
	"next",
	"nine",
	"ninety",
	"no",
	"nobody",
	"non",
	"none",
	"nonetheless",
	"noone",
	"nor",
	"normally",
	"nos",
	"not",
	"noted",
	"nothing",
	"now",
	"nowhere",
	"o",
	"obtain",
	"obtained",
	"obviously",
	"of",
	"off",
	"often",
	"oh",
	"ok",
	"okay",
	"old",
	"omitted",
	"on",
	"once",
	"one",
	"ones",
	"only",
	"onto",
	"or",
	"ord",
	"other",
	"others",
	"otherwise",
	"ought",
	"our",
	"ours",
	"ourselves",
	"out",
	"outside",
	"over",
	"overall",
	"owing",
	"own",
	"p",
	"page",
	"pages",
	"part",
	"particular",
	"particularly",
	"past",
	"per",
	"perhaps",
	"placed",
	"please",
	"plus",
	"poorly",
	"possible",
	"possibly",
	"potentially",
	"pp",
	"predominantly",
	"present",
	"previously",
	"primarily",
	"probably",
	"promptly",
	"proud",
	"provides",
	"put",
	"q",
	"que",
	"quickly",
	"quite",
	"qv",
	"r",
	"ran",
	"rather",
	"rd",
	"re",
	"readily",
	"really",
	"recent",
	"recently",
	"ref",
	"refs",
	"regarding",
	"regardless",
	"regards",
	"related",
	"relatively",
	"research",
	"respectively",
	"resulted",
	"resulting",
	"results",
	"right",
	"run",
	"s",
	"said",
	"same",
	"saw",
	"say",
	"saying",
	"says",
	"sec",
	"section",
	"see",
	"seeing",
	"seem",
	"seemed",
	"seeming",
	"seems",
	"seen",
	"self",
	"selves",
	"sent",
	"seven",
	"several",
	"shall",
	"she",
	"shed",
	"she'll",
	"shes",
	"should",
	"shouldn't",
	"show",
	"showed",
	"shown",
	"showns",
	"shows",
	"significant",
	"significantly",
	"similar",
	"similarly",
	"since",
	"six",
	"slightly",
	"so",
	"some",
	"somebody",
	"somehow",
	"someone",
	"somethan",
	"something",
	"sometime",
	"sometimes",
	"somewhat",
	"somewhere",
	"soon",
	"sorry",
	"specifically",
	"specified",
	"specify",
	"specifying",
	"still",
	"stop",
	"strongly",
	"sub",
	"substantially",
	"successfully",
	"such",
	"sufficiently",
	"suggest",
	"sup",
	"sure",
	"t's",
	"take",
	"taken",
	"tell",
	"tends",
	"th",
	"than",
	"thank",
	"thanks",
	"thanx",
	"that",
	"that's",
	"thats",
	"the",
	"their",
	"theirs",
	"them",
	"themselves",
	"then",
	"thence",
	"there",
	"there's",
	"thereafter",
	"thereby",
	"therefore",
	"therein",
	"theres",
	"thereupon",
	"these",
	"they",
	"they'd",
	"they'll",
	"they're",
	"they've",
	"think",
	"third",
	"this",
	"thorough",
	"thoroughly",
	"those",
	"though",
	"three",
	"through",
	"throughout",
	"thru",
	"thus",
	"to",
	"together",
	"too",
	"took",
	"toward",
	"towards",
	"tried",
	"tries",
	"truly",
	"try",
	"trying",
	"twice",
	"two",
	"un",
	"under",
	"unfortunately",
	"unless",
	"unlikely",
	"until",
	"unto",
	"up",
	"upon",
	"us",
	"use",
	"used",
	"useful",
	"uses",
	"using",
	"usually",
	"value",
	"various",
	"very",
	"via",
	"viz",
	"vs",
	"want",
	"wants",
	"was",
	"wasn't",
	"way",
	"we",
	"we'd",
	"we'll",
	"we're",
	"we've",
	"welcome",
	"well",
	"went",
	"were",
	"weren't",
	"what",
	"what's",
	"whatever",
	"when",
	"whence",
	"whenever",
	"where",
	"where's",
	"whereafter",
	"whereas",
	"whereby",
	"wherein",
	"whereupon",
	"wherever",
	"whether",
	"which",
	"while",
	"whither",
	"who",
	"who's",
	"whoever",
	"whole",
	"whom",
	"whose",
	"why",
	"will",
	"willing",
	"wish",
	"with",
	"within",
	"without",
	"won't",
	"wonder",
	"would",
	"wouldn't",
	"yes",
	"yet",
	"you",
	"you'd",
	"you'll",
	"you're",
	"you've",
	"your",
	"yours",
	"yourself",
	"yourselves",
	"zero"];
	$scope.drawchart=function(container,tag,pos,neg)
	{

			var chart = new CanvasJS.Chart(container, {            
				title:{
					text: "Sentiment"              
				},

      data: [  //array of dataSeries     
      { 
      	type: "column",
      	name: "Positive",
      	dataPoints: [
      	{ label: tag, y: pos },
      	]
      },
      { 

      	type: "column",
      	name: "Negative",                
      	dataPoints: [
      	{ label: tag, y: neg },
      	]
      }
      ]
  });
			chart.render();
	};

	$scope.populate1 = function(tag)
	{
		var fill = d3.scale.category20();

		//url = "http:/angelhackcincinnati.herokuapp.com/api?number=10&hashtag="+tag+"&callback=?";
		var url="http://angelhackcincinnati.herokuapp.com/apiexample?callback=?";
		

		function draw(words) {
			console.log("drawing");
			$("#cloud1").children("svg").remove();
			d3.select("#cloud1").append("svg")
			.attr("width", 300)
			.attr("height", 300)
			.append("g")
			.attr("transform", "translate(150,150)")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})

			.text(function(d) { return d.text; });
		}
		$.getJSON(url,function(data){
			
			var words=$.map(data,function(d,idx) {

				var list=d.text.toLowerCase().split(" ");

				return $.grep(list,function(elem,idx)
				{
					if(!isNaN(elem))
						return false;
					if(elem.length <2)
						return false;
					if(elem.charAt(0)==='#'||elem.charAt(0)==='@')
					{
						//ignore hashtags

						return false;
					}
					if (elem.substr(0,4)==='http')
					{
						//ignore urls
						return true;
					}
					return stop.some(function(f) 
					{
						return elem === f;
					});

				},true);

				

			});
			var pcnt=0;
			var ncnt=0;
			var pos=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue > 0)
				{
					pcnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;
			},0
			);
			var neg=data.reduce(function(previousValue, currentValue, index, array)
			{
				if(currentValue.sentimentvalue < 0)
				{
					ncnt++;
					return previousValue+parseFloat(currentValue.sentimentvalue);
				}
				else return previousValue;

			},0
			);
			pos/=(pcnt+ncnt);
			neg/=(ncnt+pcnt);
			console.log("pcnt: "+pcnt);
			console.log ("ncnt: "+ncnt);
			console.log("pos: " + pos);
			console.log("neg: " + neg);
			$scope.drawchart("sent1",tag,pos,neg);

			var wordsize={};
			$.each(words, function(i,sel)
			{
				if(sel.charAt(0)=='#')
					sel = sel.substr(1);
				if(isNaN(wordsize[sel])||wordsize[sel]===null)
				{
					wordsize[sel]=1;
					
				}	else
					{
						wordsize[sel]++;
					}
				console.log("sel: "+sel);
				console.log("count: "+wordsize[sel]);
			});
			console.log(wordsize);
			
			uWords=words.filter(function(value,index,self)
			{
				 return self.indexOf(value) === index;
			} 
				);
			console.log(words);
			d3.layout.cloud().size([300, 300])
			.words(uWords.map(function(d) {
				return {text: d, size: wordsize[d]* 10};
			}))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();


		});
};


}
