var idToEdit = 0;

const dbPromise = idb.open("favorite_teams", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        const teams = upgradeDb.createObjectStore("teams", {keyPath: 'teamId'});
        teams.createIndex("teamId", "teamId", {unique: true});
    }
});

const editHandler = (e) => {
    const data = e.target.getAttribute('data-index');
    idToEdit = parseInt(data);
    const modal = document.querySelector('.modal');
    M.Modal.getInstance(modal).open();
}

const deleteHandler = (e) => {
    const data = e.target.getAttribute('data-index');
    deleteFavoriteTeam(parseInt(data));
}

export const favorites = async () => {
    const modal = document.querySelector('.modal');
    M.Modal.init(modal);
    if(document.getElementById('save_comment')){
        document.getElementById('save_comment').addEventListener('click', function(e){
            editComment(idToEdit, document.getElementById('favorite_comment').value);
            document.getElementById('favorite_comment').value = "";
            M.Modal.getInstance(modal).close();
        })
    }
    document.getElementById('loading').removeAttribute('hidden');
    await getFavoriteTeams();
}

export const getFavoriteTeams = () => {
    return new Promise((resolve) => {
        dbPromise
        .then(function(db) {
            const tx = db.transaction('teams', 'readonly');
            const store = tx.objectStore('teams');
            return store.getAll();
        }).then(function(items) {
            const domElements = createDomElements(items);
            document.getElementById("teams").innerHTML = domElements;
            document.querySelectorAll(".delete").forEach(function(buttons){
                buttons.addEventListener('click', deleteHandler);
            });
            document.querySelectorAll(".edit").forEach(function(buttons){
                buttons.addEventListener('click', editHandler);
            });
            document.getElementById('loading').setAttribute('hidden', true);
            resolve();
        });
    });
}

export const addFavoriteTeam = (team) => {
    document.getElementById('loading').removeAttribute('hidden');
    dbPromise
    .then(function(db) {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        const item = {
            teamId: team.id,
            team: team,
            comment: "No comment.",
            created: new Date().getTime()
        };
        store.put(item);
        return tx.complete;
    }).then(function() {
        M.toast({html: 'New team has been saved.', displayLength: 1000})
        document.getElementById('loading').setAttribute('hidden', true);
    }).catch(function() {
        M.toast({html: 'Can not save the same team twice.', displayLength: 1000})
        document.getElementById('loading').setAttribute('hidden', true);
    })
}

export const editComment = (teamId, comment) => {
    document.getElementById('loading').removeAttribute('hidden');
    dbPromise
    .then(function(db) {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.get(teamId)
        .then((item) => {
            item.comment = comment;
            store.put(item);
            return tx.complete;
        })
    }).then(function() {
        getFavoriteTeams();
        M.toast({html: 'Team has been edited.', displayLength: 1000})
    }).catch(function() {
        M.toast({html: 'Failed edit team.', displayLength: 1000})
        document.getElementById('loading').setAttribute('hidden', true);
    })
}

export const deleteFavoriteTeam = (teamId) => {
    document.getElementById('loading').removeAttribute('hidden');
    dbPromise
    .then(function(db) {
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.delete(teamId);
        return tx.complete;
    }).then(function() {
        getFavoriteTeams();
        M.toast({html: 'Team has been deleted.', displayLength: 1000})
    });
}

const createDomElements = (items) => {
    let domElements = "";
    if(items.length === 0){
        domElements = "<p>You don't have any favorite team.</p>"
    }
    else {
        items.forEach((team, i) => {
            domElements = domElements + `
                <div class="card" style="margin:10px;padding:10px;">
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
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    comment
                                </i>
                            </div>
                            <div class="col s11">
                                <p>${team.comment}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <i class="material-icons edit modal-trigger" data-target="comment" data-index='${team.teamId}'>
                                    edit
                                </i>
                            </div>
                            <div class="col s6">
                                <i class="material-icons delete" data-index='${team.teamId}'>
                                    delete
                                </i>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            More About ${team.team.name}
                            <i class="material-icons right">
                                keyboard_arrow_up
                            </i>
                        </span>
                        <br />
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    history
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.founded}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    palette
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.clubColors}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    place
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.venue}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    home
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.address}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    phone
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.phone ? team.team.phone : ""}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    email
                                </i>
                            </div>
                            <div class="col s11">
                                ${team.team.email ? team.team.email : ""}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s1">
                                <i class="material-icons">
                                    language
                                </i>
                            </div>
                            <div class="col s11">
                                <a href=${team.team.website}>${team.team.website}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            `
        })
    }
    return domElements;
}