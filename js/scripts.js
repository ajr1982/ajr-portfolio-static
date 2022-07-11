//TECHNOLOGIES ORBIT ANIMATION
//register the plugin (just once)
gsap.registerPlugin(MotionPathPlugin);

function animateOrbit() {
	var tl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
	var orbitTime = 8;
	var items = [...document.querySelectorAll(".item")];
	var itemCount = items.length;
	var orbitSpacing = 1 / itemCount;
	var orbitTiming = orbitTime / itemCount;
	var halfOrbit = orbitTime / 2;

	items.forEach(function (item) {
		var orbitStartPos = orbitSpacing * items.indexOf(item);
		var orbitStartTime = orbitTiming * items.indexOf(item);

		tl.to(
			item,
			{
				motionPath: { path: "#path", align: "#path" },
				duration: orbitTime,
				ease: "none",
				repeat: -1,
			},
			orbitStartTime
		).fromTo(
			item,
			{ scale: 0.5 },
			{
				scale: 2,
				duration: halfOrbit,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			},
			orbitStartTime
		);
	});

	return tl;
}

var masterTimeline = gsap
	.timeline({
		defaults: { ease: Power1.easeOut },
		smoothChildTiming: true,
	})
	.add(animateOrbit(), 0);

masterTimeline.progress(0.9999);

//ORBIT SPEED & DIRECTION TIED TO MOUSE X

let header = document.querySelector("header");
let midpoint = header.offsetWidth / 2;
let orbitSpeed = 1;
header.addEventListener("mousemove", (e) => {
	orbitSpeed = (e.offsetX - midpoint) / midpoint;
	masterTimeline.timeScale(orbitSpeed);
});

//ACTIVE TOGGLE
const toggleActive = (el, className) => el.classList.toggle(className);

//TOGGLE NAVIGATION MENU ICONS ON CLICK
let navLinks = [...document.querySelectorAll("nav > a")];

navLinks.forEach(function (link) {
	link.addEventListener("click", (e) => {
		console.log(window.pageYOffset);
		let currentActive = document.querySelector("nav > a.active");
		if (e.target === currentActive) {
			return false;
		} else {
			toggleActive(currentActive, "active");
			toggleActive(e.target, "active");
		}
	});
});

//TOGGLE NAVIGATION MENU ICONS ON SCROLL

window.addEventListener("scroll", (event) => {
	let experienceSection = document.querySelector("#experience");
	let workSection = document.querySelector("#work");
	let contactSection = document.querySelector("#contact");

	let homeIcon = document.querySelector(".home-link");
	let experienceIcon = document.querySelector(".experience-link");
	let workIcon = document.querySelector(".work-link");
	let contactIcon = document.querySelector(".contact-link");

	let currentActive = document.querySelector("nav > a.active");
	let newActive;

	let scrollPos = window.pageYOffset;

	if (scrollPos < experienceSection.offsetTop) {
		newActive = homeIcon;
	} else if (
		scrollPos >= experienceSection.offsetTop &&
		scrollPos < workSection.offsetTop
	) {
		newActive = experienceIcon;
	} else if (
		scrollPos >= workSection.offsetTop &&
		scrollPos < contactSection.offsetTop
	) {
		newActive = workIcon;
	} else if (scrollPos >= contactSection.offsetTop) {
		newActive = contactIcon;
	}
	toggleActive(currentActive, "active");
	toggleActive(newActive, "active");
});

//TOGGLE JOBS
let jobNames = [...document.querySelectorAll("li.jobs")];
let jobDescs = [...document.querySelectorAll("p.job-desc")];

jobNames.forEach(function (job) {
	job.addEventListener("click", (e) => {
		let currentActiveJob = document.querySelector("li.active");
		let currentActiveDesc = document.querySelector("p.active");

		jobDescs.forEach(function (desc) {
			if (e.target.dataset.job !== desc.dataset.job) {
				return false;
			} else {
				toggleActive(currentActiveJob, "active");
				toggleActive(currentActiveDesc, "active");
				toggleActive(desc, "active");
				toggleActive(e.target, "active");
			}
		});
	});
});

//CLOSE PROJECT MODAL

//let closeBtn = document.querySelector(".modal-cover");
let modal = document.querySelector(".modal-cover");
let projects = [...document.querySelectorAll(".work-block")];
let expandedProjects = [...document.querySelectorAll(".modal-inner")];

modal.addEventListener("click", (e) => {
	if (e.target !== modal) {
		return false;
	} else {
		toggleActive(modal, "modal-active");
		expandedProjects.forEach(function (expandedProject) {
			expandedProject.style.opacity = 0;
			expandedProject.style.pointerEvents = "none";
		});
	}
});
//OPEN PROJECT MODAL

projects.forEach(function (project) {
	project.addEventListener("click", (e) => {
		toggleActive(modal, "modal-active");

		expandedProjects.forEach(function (expandedProject) {
			if (e.target.dataset.project !== expandedProject.dataset.project) {
				return false;
			} else {
				expandedProject.style.opacity = 1;
				expandedProject.style.pointerEvents = "all";
			}
		});
	});
});
