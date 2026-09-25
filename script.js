const techGrid = document.getElementById("techGrid");
const stackList = document.getElementById("stackList");
const selectedCount = document.getElementById("selectedCount");
const removeAll = document.getElementById("removeAll");

const menuBtn = document.getElementById("menuBtn");
const navInner = document.querySelector(".nav-inner");

let technologies = [];
let selectedStack = [];

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);
}

async function loadTechnologies() {

    techGrid.innerHTML = `
        <div class="loading">
            <div class="loader"></div>
            <p>Loading technologies...</p>
        </div>
    `;

    try {

        const response = await fetch("./data/technologies.json");

        if (!response.ok) {
            throw new Error("Could not load technology data.");
        }

        technologies = await response.json();

        renderTechnologies();

    } catch (error) {

        console.error(error);

        techGrid.innerHTML = `
            <div class="loading error">
                <p>Failed to load technologies.</p>
                <small>Please make sure the JSON file exists.</small>
            </div>
        `;
    }
}


function renderTechnologies() {

    techGrid.innerHTML = "";

    technologies.forEach((tech) => {

        const card = document.createElement("article");

        card.className = "tech-card";

        const isSelected = selectedStack.some(
            item => item.id === tech.id
        );

        card.innerHTML = `
            <div class="card-top">

                <div class="tech-icon">
                    <img
                        src="${tech.icon}"
                        alt="${tech.name} icon"
                    >
                </div>

                ${
                    tech.badge
                        ? `<span class="badge">${tech.badge}</span>`
                        : ""
                }

            </div>

            <h3>${tech.name}</h3>

            <p>${tech.description}</p>

            <div class="card-info">

                <span>${tech.category}</span>

                <span>${tech.difficulty}</span>

                <span class="rating">
                    ★ ${tech.rating}
                </span>

            </div>

            <button
                class="add-btn"
                data-id="${tech.id}"
                ${isSelected ? "disabled" : ""}
            >
                ${
                    isSelected
                        ? "✓ Added to Stack"
                        : "Add to Stack"
                }
            </button>
        `;

        techGrid.appendChild(card);
    });
}


function addToStack(id) {

    const tech = technologies.find(
        item => item.id === id
    );

    if (!tech) return;



    const alreadyAdded = selectedStack.some(
        item => item.id === id
    );

    if (alreadyAdded) {

        showToast(
            `${tech.name} is already in your stack.`,
            "warning"
        );

        return;
    }


    selectedStack.push(tech);

    renderTechnologies();
    renderStack();

    showToast(
        `${tech.name} added to your stack.`,
        "success"
    );
}


function renderStack() {

    selectedCount.textContent = selectedStack.length;


    if (selectedStack.length === 0) {

        stackList.innerHTML = `
            <div class="empty-stack">
                No technologies selected yet.
            </div>
        `;

        return;
    }


    stackList.innerHTML = "";


    selectedStack.forEach((tech) => {

        const item = document.createElement("div");

        item.className = "stack-item";

        item.innerHTML = `
            <div class="stack-tech">

                <div class="tech-icon">

                    <img
                        src="${tech.icon}"
                        alt="${tech.name} icon"
                    >

                </div>

                <div>

                    <strong>${tech.name}</strong>

                    <small>${tech.category}</small>

                </div>

            </div>

            <button
                class="stack-remove"
                data-id="${tech.id}"
                title="Remove ${tech.name}"
            >
                &times;
            </button>
        `;

        stackList.appendChild(item);
    });
}


techGrid.addEventListener("click", function (event) {

    const addButton = event.target.closest(".add-btn");

    if (!addButton) return;

    const id = addButton.dataset.id;

    addToStack(id);
});


stackList.addEventListener("click", function (event) {

    const removeButton =
        event.target.closest(".stack-remove");

    if (!removeButton) return;

    const id = removeButton.dataset.id;


    const removedTech = selectedStack.find(
        tech => tech.id === id
    );


    selectedStack = selectedStack.filter(
        tech => tech.id !== id
    );


    renderTechnologies();
    renderStack();


    if (removedTech) {

        showToast(
            `${removedTech.name} removed from your stack.`,
            "warning"
        );
    }
});


removeAll.addEventListener("click", function () {

    if (selectedStack.length === 0) {

        showToast(
            "Your stack is already empty.",
            "warning"
        );

        return;
    }


    selectedStack = [];

    renderTechnologies();
    renderStack();


    showToast(
        "All technologies removed.",
        "warning"
    );
});

menuBtn.addEventListener("click", function () {

    navInner.classList.toggle("menu-open");

});

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", function () {

            navInner.classList.remove("menu-open");

        });
    });
renderStack();
loadTechnologies();