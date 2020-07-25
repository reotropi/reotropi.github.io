import { fetcher } from './base_fetch.js';
import { addFavoriteTeam } from './favorite.js'

export async function fetchTeams() {
  document.getElementById('loading').removeAttribute('hidden');
  let response = await fetcher("https://api.football-data.org/v2/competitions/2021/teams");
  if (response){
    let teams = response.teams;
    let domElements = "";
    teams.forEach((team,i) => {
      domElements = domElements + `
      <div class="card" style="margin:10px;padding:10px;">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" alt="Football-${i}" src="${team.crestUrl}">
        </div>
        <div class="card-content">
          <span class="card-title grey-text text-darken-4">
              ${team.name}
          </span>
          <br />
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                history
              </i>
            </div>
            <div class="col s11">
              <p>${team.founded}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                palette
              </i>
            </div>
            <div class="col s11">
              <p>${team.clubColors}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                place
              </i>
            </div>
            <div class="col s11">
              <p>${team.venue}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                home
              </i>
            </div>
            <div class="col s11">
              <p>${team.address}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                phone
              </i>
            </div>
            <div class="col s11">
              <p>${team.phone ? team.phone : ""}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                email
              </i>
            </div>
            <div class="col s11">
              <p>${team.email ? team.email : ""}</p>
            </div>
          </div>
          <div class="row">
            <div class="col s1">
              <i class="material-icons">
                language
              </i>
            </div>
            <div class="col s11">
              <a href=${team.website}>${team.website}</a>
            </div>
          </div>
          <div>
            <i class="material-icons favorites" data-index='${JSON.stringify(team)}'>
              favorite
            </i>
          </div>
        </div>
      </div>
      <br />
      `
    });
    document.getElementById("teams").innerHTML = domElements;
    document.querySelectorAll(".favorites").forEach(function(buttons){
      buttons.addEventListener('click', function(e){
        const data = e.target.getAttribute('data-index');
        addFavoriteTeam(JSON.parse(data));
      });
    });
  }
  else {
    document.getElementById("teams").innerText = "Error fetching content.";
  }
  document.getElementById('loading').setAttribute('hidden', true);
}