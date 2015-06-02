![generator-sigmagen](owl.png?raw=true "Owl's are the worst.")

# Sigmagen

Sigmagen is a Yeoman generator for cool and beautiful people that allows them to create an accessible, powerful, extendable website scaffold in less time than it takes to insult an owl.

This generator is used internally by the [Sigma UK](http://www.wearesigma.com/) front end team, and is constantly being improved upon based on feedback gained and lessons learned as a result of using it on real world client projects.

This is not a perfect generator. If you think there's areas where it can be improved, _please_ let me know. This is my first time doing anything relating to automation, and I'm therefore always open to fresh suggestions and new ideas!

##Features

Sigmagen allows you to create a new web project that includes:

- A pre-made gulp file that compresses JavaScript and processes Sass, along with a few other helpful tasks
- The option to build your project in either the [Jade](http://jade-lang.com/) or [Swig](http://paularmstrong.github.io/swig/) templating languages
- The option to scaffold your project using either [Bootstrap Sass](https://github.com/twbs/bootstrap-sass) or [Bourbon (+ Neat)](http://bourbon.io/)
- The option to include the [Font Awesome](http://fortawesome.github.io/Font-Awesome/) icon font
- Base templates based on [HTML5 Boilerplate](https://html5boilerplate.com/)
- [Normalize](http://necolas.github.io/normalize.css/)
- A few handy Mixins
- A basic style guide (based on [The Poor Man's Styleguide](http://www.poormansstyleguide.com/))
- Some basic accessibility features to set you on the right path

##Getting started

If you're new to using the command line for front end automation, [this](http://yeoman.io/learning/) guide is extremely helpful. It'll help you install both Node.js and Yeoman.

Otherwise...

- Install Yeoman: `npm install yo`
- Run Yeoman: `yo`
- In the options that appear, select: `Search npm for generators`
- Search for and then select: `sigmagen`
- Run the generator, selecting the options that apply best to your project needs
- Once NPM and Bower installs have completed, run `gulp`

Ta da! You're now the proud parent of your very first sigmagen project. Congratulations!


##To-do

This project is nowhere _near_ finished. In fact, I expect it to change massively over the course of the next few months as, internally, we change the generator to reflect our current workflow.

We're also open to feedback and suggestions, so please, do let me know if there's better ways of doing things! I have a feeling that 99% of the way this is built is just straight up wrong, but hey, I won't know it unless someone tells me! Stop my reign of rampant Yeoman / Gulp based destruction, and call me out before I make you cringe yourself to death.

Anyway, new features that will be packaged within sigmagen in the near future include:

- Pre-made form styles for Bourbon
- Plugins for unit, integration and visual regression testing
- A few tools to help improve project performances
- The ability to convert the user into a noble, majestic owl. Upon running the command `gulp-owl`, the screen lights up, and your vision is obscured by a kaleidoscope of colour. Suddenly, you are transformed. Your wings are made of silk and your hoot echoes through the annals of time itself. Flinching, you stare at your reflection in the mirror. "Who am I?", you murmur, a single tear running from the corner of your obsidian eye and onto the end of your murderous beak. “A monster” you whisper, before flying off into the dark, lonely unknown.
- [Centaur.js](https://www.youtube.com/watch?v=dQw4w9WgXcQ) functionality