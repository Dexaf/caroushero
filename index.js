class CarousHero {
  constructor(heroItemContainerId, heroItemClass, heroItemCounterId, intervalTimer, animationClass) {
    //hero item container
    this.carousel = document.getElementById(heroItemContainerId);
    //hero items displayed
    this.heroItems = document.getElementsByClassName(heroItemClass);
    //container of the hero counters
    this.itemCounter = document.getElementById(heroItemCounterId);
    this.animationClass = animationClass;
    //array used to keep track of original position during drag
    this.heroItemsOriginPosition = [];
    this.heroItemWidth = this.heroItems[0]?.clientWidth;
    this.activeHeroItemIndex = 0;
    this.intervalEvent = null;
    this.intervalTimer = intervalTimer;
    this.reg = new RegExp('-?[0-9]+');
    //initial value of pointer position used to calculate the delta of the drag
    this.initValue = "ND";
    this.dragDelta = 0;
    this.boundHandleMovementEvent = this.handleMovementEvent.bind(this);


    if (this.carousel && this.heroItems.length > 0) {
      this.initCarouselCounter();
      this.initCarouselInterval();
      this.addEventListeners();
    }
  }

  //create a counter for every hero item 
  initCarouselCounter() {
    for (let i = 0; i < this.heroItems.length; i++) {
      const counter = document.createElement("span");
      counter.classList.add("hero-item-counter-dot");
      if (i === 0) counter.classList.add("active");
      this.itemCounter.appendChild(counter);
    }
  }

  initCarouselInterval() {
    this.intervalEvent = setInterval(() => {
      this.carouselMove();
    }, this.intervalTimer);
  }

  //move the carousel to a direction
  carouselMove(direction = "next") {
    this.decideNextActiveIndex(direction);

    //how much the items will be translated
    let nextTrnsX = this.heroItemWidth;
    if (this.activeHeroItemIndex === this.heroItems.length - 1 && direction === "previous")
      nextTrnsX = this.heroItemWidth * -1 * (this.heroItems.length - 1);
    else {
      nextTrnsX = -(this.heroItemWidth * this.activeHeroItemIndex);
    }

    //move every item using translateX
    //NOTE - translateX move of N units from the original position
    for (let i = 0; i < this.heroItems.length; i++) {
      this.itemCounter.children[i].classList.toggle("active", this.activeHeroItemIndex === i);
      this.heroItems[i].style.transform = `translateX(${nextTrnsX}px)`;
    }
  }

  decideNextActiveIndex(direction) {
    if (direction === "next") {
      this.activeHeroItemIndex = (this.activeHeroItemIndex + 1) % this.heroItems.length;
    } else {
      this.activeHeroItemIndex = (this.activeHeroItemIndex - 1 + this.heroItems.length) % this.heroItems.length;
    }
  }

  //UNUSED
  manualTriggerCarousel(direction) {
    clearInterval(this.intervalEvent);
    this.carouselMove(direction);
    this.initCarouselInterval();
  }

  handleMovementEvent(e) {
    if (this.initValue === "ND") this.initValue = e.clientX;
    //calculate drag delta and rotate it to match cursot direction
    this.dragDelta = (this.initValue - e.clientX) * -1;

    for (let i = 0; i < this.heroItems.length; i++) {
      //apply drag delta from original position
      this.heroItems[i].style.transform = `translateX(${this.heroItemsOriginPosition[i] + this.dragDelta}px)`;
    }
  }

  //snap the transform back to the original value before performing a carouselmove
  snapDrag() {
    for (let i = 0; i < this.heroItems.length; i++) {
      this.heroItems[i].style.transform = this.heroItemsOriginPosition[i] !== 0 ? `translateX(${this.heroItemsOriginPosition[i]}px)` : "";
    }
    if (this.dragDelta * -1 > 100) this.carouselMove("next");
    else if (this.dragDelta * -1 < -100) this.carouselMove("previous");
  }

  addEventListeners() {
    window.addEventListener("resize", () => {
      this.heroItemWidth = this.heroItems[0]?.clientWidth;
    });

    this.carousel.addEventListener("mouseenter", () => clearInterval(this.intervalEvent));

    this.carousel.addEventListener("mousedown", () => {
      clearInterval(this.intervalEvent);
      this.initValue = "ND";
      this.heroItemsOriginPosition = [];

      for (let i = 0; i < this.heroItems.length; i++) {
        //if we leave the animation class the drag get laggy
        this.heroItems[i].classList.remove(this.animationClass);
        //get current translation value
        const regData = this.reg.exec(this.heroItems[i].style.transform);
        this.heroItemsOriginPosition.push(regData ? parseInt(regData[0]) : 0);
      }

      this.carousel.addEventListener("mousemove", this.boundHandleMovementEvent);
    });

    this.carousel.addEventListener("mouseleave", () => this.restartCarousel());
    this.carousel.addEventListener("mouseup", () => this.restartCarousel());
  }

  restartCarousel() {
    for (let i = 0; i < this.heroItems.length; i++) {
      this.heroItems[i].classList.add(this.animationClass);
    }
    if (this.dragDelta !== 0) this.snapDrag();
    this.heroItemsOriginPosition = [];
    this.dragDelta = 0;
    clearInterval(this.intervalEvent);
    this.initCarouselInterval();
    this.carousel.removeEventListener("mousemove", this.boundHandleMovementEvent);
  }
}