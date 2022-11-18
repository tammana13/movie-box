var requests = [];
var res=[];
var j,word;

function Searchf(){
word=document.getElementById("na").value;
res=[];
requests = [];
jQuery.ajax({
  url: 'http://www.omdbapi.com/?apikey=dd00d5e4&s='+word+'&page=1',
  dataType: 'json',
  cache: true,
  jsonp: false,
  
}).then(function (results) {
  for (i=0;i<results.Search.length;i++){
    requests.push( $.get('http://www.omdbapi.com/?apikey=dd00d5e4&i='+results.Search[i].imdbID))
      console.log(results.Search[i].imdbID)
  }
  console.log(results)
  $.when.apply($,requests).done(function(){
    
    console.log(arguments); 
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i][0].BoxOffice==undefined){arguments[i][0].BoxOffice="N/A"}
      try{
        j=arguments[i][0].Ratings[1].Value;
      }
    catch(err){
      j="N/A"
    }
     res.push(
      React.createElement("div",{className: "container-fluid bg-dark text-white rounded border border-2 border-secondary"},
         React.createElement(
          "div",{className: "row "},
           React.createElement("div",{className: "col-md-1 my-auto "},
             React.createElement("div",{className: "mt-1 badge bg-secondary text-wrap", style: {height: "3rem",width: "3rem"}},
               React.createElement("h2", null, i+1)
            )
          ),
           React.createElement("div",{className: "col-md-2 ms-0 my-2  "},
           React.createElement("img", {
              src:arguments[i][0].Poster,
              style: {maxWidth: "75%" },className: "img-thumbnail rounded  ",alt: "..."})
          ),
           React.createElement("div",{className: "col-sm-8"},
             React.createElement("b", null, arguments[i][0].Title+" ("+arguments[i][0].Year+")"),
             React.createElement("br", null),
             React.createElement("b", null,arguments[i][0].Genre),
             React.createElement("br", null),
             
             React.createElement("p",null,React.createElement("b",null,
                "Metascore: "+ arguments[i][0].Metascore+"/100 IMDB: "+arguments[i][0].imdbRating+"/10 Rotten Tomatoes: "+j+" Votes: "+arguments[i][0].imdbVotes)
            ),
             React.createElement("p",null, arguments[i][0].Plot),
            "Runtime : "+arguments[i][0].Runtime+" Language : "+arguments[i][0].Language,
             React.createElement("br", null),
            "BoxOffice : "+arguments[i][0].BoxOffice,
             React.createElement("br", null),
            "Actors : "+arguments[i][0].Actors
          )
        )
      )
     )
  }
  ReactDOM.render(res,document.getElementById('root'));
  
  })
});}
