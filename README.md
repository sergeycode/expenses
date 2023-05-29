<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">

  <h3 align="center">Expenses Project with ReactFire</h3>

  <p align="center">
    Completed by Serhii Ovcharenko on May 28, 2023
  </p>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

1. Selected Next.js with Chakra UI and other packages as the initial setup for the project.
2. Added the necessary configuration for Firebase to establish a basic setup.
3. Created a basic user interface consisting of components such as Header, Footer, Signup, and Login, along with respective pages.
4. Implemented the functionality for user signup and login using Formik, Yup, and Firebase.
5. Added features for password reset, including the forget password and reset password functionality.
6. Developed a dashboard to display information specific to logged-in users.
7. Included sections in the dashboard for managing expenses and income, enabling users to add entries that are stored in the firestore database.
8. Implemented a table with edit and delete functionality for viewing and managing expenses and income.
9. Refactored the code for improved organization and restyled the user interface.
10. Added Homepage for Marketing purposes.
11. Due to using Next.js, I would have to use the Firebase Admin SDK to access firestore data on the server side for protected routes. However, for this project, I utilized the reactire package (as a requirement) to access firestore data on the client side, which may not be considered a best practice for Next.js. As a result, there may be some page flickering on the protected routes due to client-side user authentication checks.
12. Added Jest test for TransactionForm and refactored code to make it testable.
13. Deployed the project on Vercel.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![react][react]][react-url]
- [![Next.js][next-js]][next-js-url]
- [![ChakraUI][chakraui]][chakraui-url]
- [![Typescript][typescript]][typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Installation

1. Clone the repo
   ```sh
   git clone git@github.com:sergeycode/expenses.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. For dev mode run
   ```sh
   npm run dev
   ```
4. For Jest tests run
   ```sh
   npm run test
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployed on

[![vercel][vercel]][vercel-url]

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Twitter - [@sergeycode](https://twitter.com/sergeycode)

Project Link: [https://github.com/sergeycode/expenses](https://github.com/sergeycode/expenses)

Portfolio - [https://serhii.pro/](https://serhii.pro/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[typescript-url]: https://www.typescriptlang.org/
[chakraui-url]: https://chakra-ui.com/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sergeyovcharenko
[product-screenshot]: public/images/screenshot.jpg
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[chakraui]: https://img.shields.io/badge/Chakra-20232A?style=for-the-badge&logo=chakraui&logoColor=319795
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[vercel]: https://img.shields.io/badge/vercel-20232A?style=for-the-badge&logo=vercel
[vercel-url]: https://ex-trackr.vercel.app/
