# CarousHero - JavaScript Carousel

CarousHero is a simple and customizable JavaScript carousel that allows automatic sliding and drag-based navigation. It is easy to integrate into any webpage.

## Features

- Automatic sliding with a customizable interval
- Manual navigation using drag (click and move)
- Responsive behavior
- Smooth animations

## Installation example

To use CarousHero, include the following files in your project:

1. **HTML**

   ```html
   <div id="hero-carousel">
   	<div id="hero-item-container">
   		<!-- Add more hero-item for additional slides -->
   		<article class="hero-item animate-1s">
   			<img src="https://cataas.com/cat" alt="beautiful cat" draggable="false" />
   			<div class="background"></div>
   			<div class="content">
   				<section class="text">
   					<h2>Incredible Cat - The Experience</h2>
   					<p>Some description text here...</p>
   				</section>
   				<section class="cta">
   					<button>Action</button>
   				</section>
   			</div>
   		</article>
   	</div>
   	<div id="hero-item-counter"></div>
   </div>
   ```

2. **CSS**

  use the css that i've added in the repo as a starting point for the layout

2. **JavaScript**
   ```html
   <script src="./index.js"></script>
   <script>
   	const myCarousel = new CarousHero("hero-carousel", "hero-item", "hero-item-counter", 3000, "animate-1s");
   </script>
   ```

## Usage

To create a new instance of CarousHero, use the following syntax:

```javascript
const myCarousel = new CarousHero(
	"hero-carousel", // ID of the main carousel container
	"hero-item", // Class name for individual slides
	"hero-item-counter", // ID of the counter container
	3000, // Interval time in milliseconds
	"animate-1s" // CSS class for animation
);
```

## Customization

- **Animation Class:** Change `animate-1s` to your preferred CSS animation class.
- **Interval Timer:** Modify the interval time (e.g., `5000` for 5 seconds between slides).
- **Styling:** Customize the CSS to fit your design.

## Controls

- **Automatic Sliding:** The carousel automatically transitions between slides based on the interval set.
- **Drag Navigation:** Click and drag left or right to navigate manually.
- **Pause on Hover:** Hovering over the carousel pauses automatic sliding.

## License

This project is open-source and free to use in any project.

Enjoy your new JavaScript carousel! 🚀
