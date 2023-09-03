import { Quiz} from '../shared/models/Quiz.model';
// import { QuizResource } from '../shared/models/QuizResource.model';

export const QUIZ_DATA: Quiz[] = [
  {
    quizId: 'level1',
    SNumber:1,
    isEnable:false,
    marks:0,
    milestone: 'TypeScript',
    summary: 'TypeScript makes it easier to read and debug JavaScript code.',
    // imageUrl:"https://i.postimg.cc/1X7t9nVv/1.jpg",
    imageUrl: '../../assets/images/1.jpg',
    imageUrl1: '../../assets/images/subject.png',
    questions: [
      {
        questionText: 'Which of the following does TypeScript use to specify the type information?',
        options: [
          { text: ':', correct: true },
          { text: ';' },
          { text: '!' },
          { text: '&' }
        ],
        explanation: 'TS uses a colon (:) to separate the property name from the property type'
      },
      {
        questionText: 'Which of the following is NOT a type used in TypeScript?',
        options: [
          { text: 'number' },
          { text: 'string' },
          { text: 'boolean' },
          { text: 'enum', correct: true }
        ],
        explanation: 'enum is not used as a type in TypeScript'
      },
      {
        questionText: 'How can we specify properties and methods for an object in TypeScript?',
        options: [
          { text: 'Use classes' },
          { text: 'Use interfaces', correct: true },
          { text: 'Use enums' },
          { text: 'Use async/await' }
        ],
        explanation: 'interfaces are typically used to list the properties and methods for an object'
      },
      // {
      //   questionText: 'How else can Array<number> be written in TypeScript?',
      //   options: [
      //     { text: '@number' },
      //     { text: 'number[]', correct: true },
      //     { text: 'number!' },
      //     { text: 'number?' }
      //   ],
      //   explanation: 'number[] is another way of writing Array<number> in TypeScript'
      // },
      // {
      //   questionText: 'In which of these does a class take parameters?',
      //   options: [
      //     { text: 'constructor', correct: true },
      //     { text: 'destructor', },
      //     { text: 'import' },
      //     { text: 'subscribe' }
      //   ],
      //   explanation: 'a constructor is used by a class to take in parameters'
      // },
      // {
      //   questionText: 'Which is NOT an access modifier?',
      //   options: [
      //     { text: 'private' },
      //     { text: 'protected' },
      //     { text: 'public' },
      //     { text: 'async', correct: true }
      //   ],
      //   explanation: 'async is not used as an access modifier type in TypeScript'
      // },
      // {
      //   questionText: 'Which keyword allows us to share information between files in TypeScript?',
      //   options: [
      //     { text: 'import' },
      //     { text: 'export', correct: true },
      //     { text: 'async' },
      //     { text: 'constructor' }
      //   ],
      //   explanation: 'the export keyword allows for the information to be transmitted between files'
      // },
      // {
      //   questionText: 'Which is an array method to generate a new array based on a condition?',
      //   options: [
      //     { text: 'filter', correct: true },
      //     { text: 'map' },
      //     { text: 'async' },
      //     { text: 'enum' }
      //   ],
      //   explanation: 'filter is a method used to conditionally create a new array'
      // },
      // {
      //   questionText: 'How is a property accessible within a class?',
      //   options: [
      //     { text: 'using this.propertyName', correct: true },
      //     { text: 'accessors' },
      //     { text: 'destructuring' },
      //     { text: 'arrow function' }
      //   ],
      //   explanation: 'this.propertyName is the way to access a specific property within a class'
      // }
    ],
    status: '',
   },
  {
    quizId: 'level2',
    SNumber:1,
    isEnable:false,
    marks:0,
    milestone: 'Creating your first app',
    summary: 'Angular allows us to create an app that contains components and modules as well as a system for bootstrapping the app.',
    // imageUrl:'https://i.postimg.cc/MH6MZJPp/2.png',
    imageUrl: '../../assets/images/2.jpg',
    imageUrl1: '../../assets/images/subject.png',

    questions: [
      {
        questionText: 'Which of the following are true statements about Angular?',
        options: [
          { text: 'Angular is a development platform.' ,correct: true},
          { text: 'Angular minimizes much of the code you would have to write.' },
          { text: 'Angular extends HTML\'s syntax to define your HTML components.' },
          { text: 'All of the above.' }
        ],
        explanation: 'all of the above are true statements about Angular'
      },
      {
        questionText: 'Which of the following can be added to an Angular class?',
        options: [
          { text: 'Properties and methods', correct: true },
          { text: 'Imports and exports' },
          { text: 'Template variables' },
          { text: 'Styles' }
        ],
        explanation: 'properties and methods can be added to a class in Angular'
      },
      // {
      //   questionText: 'How is a class adorned in Angular?',
      //   options: [
      //     { text: 'Using the @Component decorator', correct: true },
      //     { text: 'Using the @Injectable decorator' },
      //     { text: 'Using the @Input decorator' },
      //     { text: 'Using the @Output decorator' }
      //   ],
      //   explanation: 'a class is adorned with the @Component decorator in Angular'
      // },
     
      // {
      //   questionText: 'Which defines the location of a component?',
      //   options: [
      //     { text: 'decorator', correct: true  },
      //     { text: 'selector'},
      //     { text: 'template' },
      //     { text: 'templateUrl' }
      //   ],
      //   explanation: 'a selector defines the location of a component in Angular'
      // },
      // {
      //   questionText: 'Which defines the HTML code that the component generates?',
      //   options: [
      //     { text: 'decorator' },
      //     { text: 'selector' },
      //     { text: 'template', correct: true },
      //     { text: 'templateUrl' }
      //   ],
      //   explanation: 'a template contains the HTML code that a component generates'
      // },
      // {
      //   questionText: 'Which is used for grouping Angular building blocks together?',
      //   options: [
      //     { text: 'NgModule', correct: true },
      //     { text: 'template' },
      //     { text: 'selector' },
      //     { text: 'decorator' }
      //   ],
      //   explanation: 'the NgModule is used to group Angular components and modules together'
      // },
      // {
      //   questionText: 'How is an Angular module adorned?',
      //   options: [
      //     { text: '@NgModule', correct: true },
      //     { text: '@Component' },
      //     { text: '@Injectable' },
      //     { text: '@Output' }
      //   ],
      //   explanation: '@NgModule is used to decorate an Angular module'
      // },
      // {
      //   questionText: 'Which array specifies components belonging to AppModule?',
      //   options: [
      //     { text: 'imports' },
      //     { text: 'declarations', correct: true },
      //     { text: 'bootstrap' },
      //     { text: 'providers' }
      //   ],
      //   explanation: 'the declarations array contains all the components that belong to AppModule'
      // },
      // {
      //   questionText: 'Which of the following code is used for bootstrapping an app?',
      //   options: [
      //     { text: '<app-module #bootstrap></app-module>' },
      //     { text: '<bootstrap>AppModule</bootstrap>' },
      //     { text: 'bootstrap: [AppModule]' },
      //     { text: 'platformBrowserDynamic().bootstrapModule(AppModule);', correct: true }
      //   ],
      //   explanation: 'passing AppModule into the platformBrowserDynamic() is the method used for bootstrapping an Angular app'
      // }
    ],
    status: ''
  },
  {
    quizId: 'level3',
    SNumber:1,
    isEnable:false,
    marks:0,
    milestone: 'Templates',
    summary: 'Angular has a very expressive template system, which takes HTML as a base, and extends it with custom elements.',
    // imageUrl: 'https://i.postimg.cc/Kv5kWjY3/3.png',
        imageUrl: '../../assets/images/3.jpg',
        imageUrl1: '../../assets/images/subject.png',


  
    questions: [
      {
        questionText: 'What characters are used for text interpolation?',
        options: [
          { text: 'backticks: ``', correct: true },
          { text: 'double curlies: {{ }}' },
          { text: 'double ampersand: &&' },
          { text: 'double pipes: ||' }
        ],
        explanation: 'backticks are used in Angular for insertion of text'
      },
      {
        questionText: 'Which characters are used to include a property value? ',
        options: [
          { text: 'backticks: ``', correct: true },
          { text: 'double curlies {{ }}'},
          { text: 'double ampersand &&' },
          { text: 'double pipes ||' }
        ],
        explanation: 'double curlies are used to insert a property value inside a template'
      },
      // {
      //   questionText: 'How can you pass a value to a child element\'s attribute?',
      //   options: [
      //     { text: 'Use string interpolation {{ property }}', correct: true },
      //     { text: 'call a function' },
      //     { text: 'using the export keyword' },
      //     { text: '[attribute]="property"', correct: true }
      //   ],
      //   explanation: 'properties can be based to a child element using string interpolation or [attribute]="property" syntax'
      // },
      // {
      //   questionText: 'Which is a shortcut for applying a class name based on value of property?',
      //   options: [
      //     { text: '{{ property }}' },
      //     { text: '``property``' },
      //     { text: '[class.property]="isProperty"', correct: true },
      //     { text: 'property$' }
      //   ],
      //   explanation: 'we use the [class.property] syntax to assign a class name based on a value of property.'
      // },
      // {
      //   questionText: 'What is the proper way to bind styles to a button in Angular?',
      //   options: [
      //     { text: '<button {{style}}></button>' },
      //     { text: '<button style="color: blue"' },
      //     { text: '<button [style.color]="blue">', correct: true },
      //     { text: '<button>insert style ligature</button>' }
      //   ],
      //   explanation: '[style.styleProperty] is the way of binding a style to an element in Angular'
      // },
      // {
      //   questionText: 'Which of the following are examples of event bindings in Angular?',
      //   options: [
      //     { text: '[click]' },
      //     { text: '@click' },
      //     { text: '(click)', correct: true },
      //     { text: 'on-click', correct: true }
      //   ],
      //   explanation: '(click) and its HTML equivalent \'on-click\' are examples of event bindings'
      // },
      // {
      //   questionText: 'How do we provide access to an HTML element or Angular component from the template?',
      //   options: [
      //     { text: 'Use attribute binding [attr]="name"' },
      //     { text: 'Use backticks' },
      //     { text: 'Use double curlies' },
      //     { text: 'Mark it with #name', correct: true }
      //   ],
      //   explanation: 'marking it with #name is the way to access the HTML element from an Angular template'
      // },
      // {
      //   questionText: 'What mechanism does Angular provide for handling keyboard shortcuts?',
      //   options: [
      //     { text: 'event binding' },
      //     { text: 'data binding' },
      //     { text: 'text interpolation' },
      //     { text: '(keydown.control.enter)', correct: true }
      //   ],
      //   explanation: '(keydown.control.enter) is Angular\'s syntax for handling keyboard shortcuts'
      // },
      // {
      //   questionText: 'Which directive adds or removes an element from the DOM?',
      //   options: [
      //     { text: '*ngFor' },
      //     { text: '*ngIf', correct: true },
      //     { text: '*ngSwitch' },
      //     { text: '[ngStyle]' }
      //   ],
      //   explanation: 'ngIf is used to conditionally add or remove an element from the DOM'
      // },
      // {
      //   questionText: 'Which directive can be used to display an array of cat images?',
      //   options: [
      //     { text: '*ngFor', correct: true },
      //     { text: '*ngIf' },
      //     { text: '*ngSwitch' },
      //     { text: '[ngStyle]' }
      //   ],
      //   explanation: 'the ngFor directive is used to display entire arrays or objects'
      // }
    ],
    status: ''
  },

];

// export const QUIZ_RESOURCES: QuizResource[] = [
//   {
//     quizId: 'TS_Quiz',
//     milestone: 'TypeScript',
//     resources: [
//       {
//         title: 'TypeScript language website',
//         url: 'https://www.typescriptlang.org',
//         host: 'TypeScript website'
//       },
//       {
//         title: 'Microsoft TypeScript GitHub page',
//         url: 'https://github.com/microsoft/TypeScript',
//         host: 'GitHub'
//       },
//       {
//         title: 'TypeScript Wiki',
//         url: 'https://en.wikipedia.org/wiki/TypeScript',
//         host: 'Wikipedia'
//       },
//       {
//         title: 'TypeScript blog',
//         url: 'https://devblogs.microsoft.com/typescript/',
//         host: 'Microsoft dev blogs'
//       }
//     ]
//   },
//   {
//     quizId: 'create-first-app',
//     milestone: 'Creating your first app',
//     resources: [
//       {
//         title: 'Getting started with a basic Angular app',
//         url: 'https://angular.io/start',
//         host: 'angular.io'
//       },
//       {
//         title: 'Creating Your First Angular App: Basics',
//         url: 'https://code.tutsplus.com/tutorials/creating-your-first-angular-app-basics--cms-30092',
//         host: 'envatotuts+'
//       },
//     ]
//   },
//   {
//     quizId: 'templates',
//     milestone: 'Templates',
//     resources: [
//       {
//         title: 'Introduction to components and templates',
//         url: 'https://angular.io/guide/architecture-components#:~:text=Angular%20templates%20are%20dynamic.,component%20is%20technically%20a%20directive.',
//         host: 'angular.io'
//       },
//       {
//         title: 'Angular 4 - Templates',
//         url: 'https://www.tutorialspoint.com/angular4/angular4_templates.htm',
//         host: 'tutorialspoint'
//       },
//       {
//         title: 'Angular templates and views',
//         url: 'https://howtodoinjava.com/angular/angular-templates-and-views/#:~:text=A%20template%20is%20an%20HTML,component%20defines%20that%20component\'s%20view.',
//         host: 'HowToDoInJava'
//       }
//     ]
//   },
//   {
//     quizId: 'dependency-injection',
//     milestone: 'Dependency Injection',
//     resources: [
//       {
//         title: 'Dependency injection in Angular',
//         url: 'https://angular.io/guide/dependency-injection',
//         host: 'angular.io'
//       },
//       {
//         title: 'Dependency injection in action',
//         url: 'https://angular.io/guide/dependency-injection-in-action',
//         host: 'angular.io'
//       },
//       {
//         title: 'Introduction to services and dependency injection',
//         url: 'https://angular.io/guide/architecture-services',
//         host: 'angular.io'
//       },
//       {
//         title: 'Total Guide To Angular 6+ Dependency Injection...',
//         url: 'https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f',
//         host: 'medium.com'
//       }
//     ]
//   },
//   {
//     quizId: 'component-tree',
//     milestone: 'Component Tree',
//     resources: [
//       {
//         title: 'Introduction to Angular concepts',
//         url: 'https://angular.io/guide/architecture',
//         host: 'angular.io'
//       },
//       {
//         title: 'The Core Concepts of Angular',
//         url: 'https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04',
//         host: 'vsavkin.com'
//       }
//     ]
//   },
//   {
//     quizId: 'router',
//     milestone: 'Angular Router',
//     resources: [
//       {
//         title: 'In-app navigation: routing to views',
//         url: 'https://angular.io/guide/router',
//         host: 'angular.io'
//       },
//       {
//         title: 'API: @angular/router',
//         url: 'https://angular.io/api/router',
//         host: 'angular.io'
//       },
//       {
//         title: 'A Complete Guide To Routing In Angular',
//         url: 'https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/',
//         host: 'Smashing Magazine'
//       },
//       {
//         title: 'Using Route Parameters',
//         url: 'https://angular-2-training-book.rangle.io/routing/routeparams',
//         host: 'Rangle.io'
//       }
//     ]
//   },
//   {
//     quizId: 'material',
//     milestone: 'Angular Material',
//     resources: [
//       {
//         title: 'Getting Started with Angular Material',
//         url: 'https://material.angular.io/guide/getting-started',
//         host: 'Angular Material official website'
//       },
//       {
//         title: 'Angular Material UI component library',
//         url: 'https://material.angular.io',
//         host: 'Angular Material official website'
//       },
//       {
//         title: 'Material Design',
//         url: 'https://www.material.io',
//         host: 'material.io'
//       },
//       {
//         title: 'Angular Material 7 Tutorial',
//         url: 'https://www.tutorialspoint.com/angular_material7/index.htm',
//         host: 'tutorialspoint'
//       }
//     ]
//   },
//   {
//     quizId: 'forms',
//     milestone: 'Forms',
//     resources: [
//       {
//         title: 'Introduction to forms in Angular',
//         url: 'https://angular.io/guide/forms-overview',
//         host: 'angular.io'
//       },
//       {
//         title: 'Angular Forms Guide - Template Driven and Reactive Forms',
//         url: 'https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/',
//         host: 'Angular University'
//       },
//       {
//         title: 'Template-Driven Form Validation In Angular',
//         url: 'https://ankitsharmablogs.com/template-driven-form-validation-in-angular/',
//         host: 'Ankit Sharma\'s Blog',
//       },
//       {
//         title: 'How to validate Angular Reactive Forms',
//         url: 'https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/',
//         host: 'freecodecamp.org'
//       }
//     ]
//   },
//   {
//     quizId: 'angular-cli',
//     milestone: 'Angular-CLI',
//     resources: [
//       {
//         title: 'CLI Overview and Command Reference',
//         url: 'https://angular.io/cli',
//         host: 'angular.io'
//       },
//       {
//         title: 'Angular 8 Tutorial: Build your First Angular App',
//         url: 'https://www.techiediaries.com/angular-8-tutorial-build-first-angular-calculator-app/',
//         host: 'TechieDiaries'
//       },
//       {
//         title: 'Starting an Angular app with the Angular CLI',
//         url: 'https://scotch.io/courses/build-your-first-angular-website/starting-an-angular-app-with-the-angular-cli',
//         host: 'Scotch'
//       }
//     ]
//   }
// ];
