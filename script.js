async function loadIncludes() {
  const header = await (await fetch("navbar.html")).text();
  document.getElementById("navbar").innerHTML = header;

  const footer = await (await fetch("footer.html")).text();
  document.getElementById("footer").innerHTML = footer;
}

const form = document.getElementById("search-form");
const divForPhrases = document.getElementById("for-paint-dom");
const randomBtn = document.getElementById("get-random");

function fetchRandomPhrases() {
  divForPhrases.innerHTML = "";
  showSpinner();
  setTimeout(() => {
    fetch("./Phrases_2024_utf8.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const a = Math.floor(Math.random() * data.length) + 1;
        const b = Math.floor(Math.random() * data.length) + 1;
        const c = Math.floor(Math.random() * data.length) + 1;
        const d = Math.floor(Math.random() * data.length) + 1;
        const e = Math.floor(Math.random() * data.length) + 1;
        const f = Math.floor(Math.random() * data.length) + 1;
        newData = [data[a], data[b], data[c], data[d], data[e], data[f]];
        hideSpinner();
        fillDOM(newData);
      });
  }, 600);
}

function fillDOM(data) {
  // const cleanedData = data.map((entry) => entry.item);
  data.forEach((phrase) => {
    const div = document.createElement("div");
    div.setAttribute("data-id", phrase.id);
    div.innerHTML = `

                    <div class="col">
                        <div class="card mb-3 shadow">
                            <div class="card-header bg-secondary"></div>
                            <div class="card-body">
                                <div class="h5">
                                    <i class="bi bi-translate"></i>
                                </div>
                                <h5 class="card-title">${phrase.irish}</h5>
                                <h5 class="card-subtitle text-muted">${phrase.english}</h5>
                            </div>
                            <div class="card-footer bg-secondary">
                            </div>
                        </div>  
                    </div>
                          
    `;

    document.getElementById("for-paint-dom").appendChild(div);
  });
}

const options = {
  keys: ["id", "english", "irish"],
  threshold: 0.4,
  useExtendedSearch: true,
};

function fetchAllData(searchTerm) {
  showSpinner();
  setTimeout(() => {
    fetch("./Phrases_2024_utf8.json")
      .then((response) => {
        return response.json();
      })
      .then((phrases) => {
        const fuse = new Fuse(phrases, options);

        let result = fuse.search(searchTerm);
        result = result.map((entry) => entry.item);
        hideSpinner();
        fillDOM(result);
      });
  }, 600);
}

function onFormSubmit(e) {
  e.preventDefault();
  const searchTerm = document.getElementById("searchTerm").value;
  if (searchTerm === "") {
    alert("Please enter some text");
  }
  divForPhrases.innerHTML = "";

  fetchAllData(searchTerm);
}

function showSpinner() {
  document.querySelector("#spinner").style.display = "block";
}

function hideSpinner() {
  document.querySelector("#spinner").style.display = "none";
}

function init() {
  loadIncludes();
  // fetchRandomPhrases();
  hideSpinner();
}

init();

// EVENT listeners
form.addEventListener("submit", onFormSubmit);
randomBtn.addEventListener("click", fetchRandomPhrases);
