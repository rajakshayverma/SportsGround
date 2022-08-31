const WebpageSelectScreen = {
  after_render: (_) => {},
  render: (_) => {
    return `
    <div class="leftbar">
        <ul>
            <a href="#/ground"><li>Cricket Ground</li></a>
            <a href="#/shop"><li>Cricket Products</li></a>
        </ul>
    </div>
    <div class="main-box-select-webpage">
    <div class="label">
        <span>About US</span>
    </div>
    <div class="about" id="aboutusdiv">
        <p>
        <strong>1.Crickets Sports items:</strong>
        Brand : RSLA & Zap.
         🏏We ready Cricket sports items  for all over  India and Global market. 
        👍All cricket items available online for Sale as shared in site...
        👍On demand big order of leather balls..
        Cricket customized bats English and Kashmir willow, 
        Soft goods and Cricket white and Sublimation colour dress we can supply to all our customers..
        <br><br>
        <strong>2.Cricket Ground facility for Ncr Cricket lovers: </strong>
        <br>
        STAR SHINE CRICKET GROUND STARTED IN 2019.. Its Branch business of Ruhaan Sports love Arena. 
        👍🏽You can book your cricket Games here any time.. 
        🏏Light and pitch Quality very nice for Corp.. cricket games' You can book for corp.. big leaugue or state level or Friendly games or any Event if you want to organize here you all are most welcome. 
        <br>
        <br>
        Facility: 
        Cricket Ground, 
        Big parking Area,
         Nets, canteen, 
        Umpires, Sight Screen,Sports gears, Balls, Online scoring, Live game with Mobile as well as HD CAMS LIVE in You tube."
        </p>
        <img src="./images/homescreen/5.jpg" />
    </div>
            
<div class="rightbar">
    <div class="ground-card">
        <img src="https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/ground%20image/ground1.jpeg?raw=true" alt="gurgaon ground image" />
        <span>Star Shine Cricket<br> Ground 1</span>
        <span>With Flood Lights</span>
        <span>Star Shine Sports Cricket Ground<br>
        Kadarpur Gurugram,Harayana-122102</span>
        <a href="https://api.whatsapp.com/send/?phone=918800198964&text=Hello%20i%20got%20your%20number%20from%20website%20and%20i%20want%20to%20book%20ground&app_absent=0">
        <button>Book Now</button></a>
    </div>
    <div class="ground-card">
        <img src="https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/ground%20image/ground2.jpeg?raw=true" alt="gurgaon ground image" />
        <span>Start Shine Cricket<br> Ground 2</span>
        <span>Without Flood Lights</span>
        <span>Star Shine Sports Cricket Ground<br>
        Kadarpur Gurugram,Harayana-122102</span>
        <a href="https://api.whatsapp.com/send/?phone=918800198964&text=Hello%20i%20got%20your%20number%20from%20website%20and%20i%20want%20to%20book%20ground&app_absent=0">
        <button>Book Now</button></a>
    </div>
    <div class="ground-card">
        <img src="https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/products/pads.jpeg?raw=true" alt="gurgaon ground image" />
        <span>Cricket Products<br>Shop</span>
        <span>All cricket products</span>
        <span>Ruhaan sports, Sector 7 <br>
        Gurugram,Harayana-122001</span>
        <a href="#/shop"><button>
        Shop Now</button></a>
    </div>
    </div>
    </div>
    
        `;
  },
};

export default WebpageSelectScreen;
