import {fetcher} from './base_fetch.js';

export async function fetchHome() {
  document.getElementById('loading').removeAttribute('hidden');
  let response = await fetcher("https://api.football-data.org/v2/competitions/2021/standings");
  if (response){
    let standings = response.standings[0].table;
    let sorted = standings.sort((a, b) => {return a.position - b.position})
    let domElements = "";
    sorted.forEach((team,i) => {
      domElements = domElements + `
      <div class="card" style="margin:10px">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" alt="Football-${i}" src="${team.team.crestUrl}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
              ${team.team.name}
              <i class="material-icons right">
                  keyboard_arrow_down
              </i>
          </span>
          <br />
          <div class="row" style="background-color:green">
            <div class="col s5">
                <p style="text-align:right">
                  Win
                </p>
            </div>
            <div class="col s2">
                <p style="text-align:center"> = </p>
            </div>
            <div class="col s5">
                <p>
                  ${team.won}
                </p>
            </div>
          </div>
          <div class="row" style="background-color:yellow">
            <div class="col s5">
                <p style="text-align:right">
                    Draw
                </p>
            </div>
            <div class="col s2">
                <p style="text-align:center"> = </p>
            </div>
            <div class="col s5">
                <p>
                  ${team.draw}
                </p>
            </div>
          </div>
          <div class="row" style="background-color:red">
            <div class="col s5">
                <p style="text-align:right">
                  Lost
                </p>
            </div>
            <div class="col s2">
                <p style="text-align:center"> = </p>
            </div>
            <div class="col s5">
                <p>
                  ${team.lost}
                </p>
            </div>
          </div>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
              More About ${team.team.name}
              <i class="material-icons right">
                  keyboard_arrow_up
              </i>
          </span>
          <p>
            Played Games = ${team.playedGames}
          </p>
          <p>
            Goals For = ${team.goalsFor}
          </p>
          <p>
            Goals Against = ${team.goalsAgainst}
          </p>
          <p>
            Goals Difference = ${team.goalDifference}
          </p>
          <p>
            Points = ${team.points}
          </p>
          <p>
            Position = ${team.position}
          </p>
        </div>
      </div>
      <br />
      `
    });
    document.getElementById("teams").innerHTML = domElements;
  }
  else {
    document.getElementById("teams").innerText = "Error fetching content.";
  }
  document.getElementById('loading').setAttribute('hidden', true);
}