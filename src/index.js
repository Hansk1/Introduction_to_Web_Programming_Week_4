import "./styles.css";

const submitButton = document.getElementById("submit-data");
submitButton.addEventListener("click", () => fetchShowdata());

async function fetchShowdata() {
  //Fetch show's data:
  let showName = document.getElementById("input-show").value;
  const url = "https://api.tvmaze.com/search/shows?q=" + showName;
  const dataPromise = await fetch(url);
  const dataJSON = await dataPromise.json();
  console.log(dataJSON);
  const showContainer = document.getElementById("show-container");

  dataJSON.forEach((data) => {
    //Create div for show's data:
    let showDataDiv = document.createElement("div");
    showDataDiv.className = "show-data";

    //Check if there is an image for the show:
    let img = document.createElement("img");

    if (data.show.image) {
      img.src = data.show.image.medium;
    } else {
      img.src = "";
      img.alt = "Sadly, there is no image.";
    }

    //Create div for show's info:
    let showInfoDiv = document.createElement("div");
    showInfoDiv.className = "show-info";

    //Create heading for show name:
    let h1 = document.createElement("h1");
    h1.textContent = data.show.name;

    //Create paragraph for show summary:
    let p = document.createElement("p");
    p.innerHTML = data.show.summary;

    //Append everything inside to showDataDiv:
    showDataDiv.appendChild(img);
    showDataDiv.appendChild(showInfoDiv);

    //Append items inside to showinfo div:
    showInfoDiv.appendChild(h1);
    showInfoDiv.appendChild(p);

    //Append show-data div to show-container:
    showContainer.appendChild(showDataDiv);
  });
}
