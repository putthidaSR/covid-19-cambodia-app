# COVID-19 Cambodia Mobile App

As I couldn't find any COVID-19 related apps written in [Khmer](https://en.wikipedia.org/wiki/Khmer_language) language, I built this project just for personal usage in order to get an up-to-date COVID-19 data in Cambodia.

The project is built with React-Native which will generate both iOS and Android apps.
The [APIs](https://covid19.mathdro.id/) I was using to fetch COVID-19 data are provided by [mathdroid](https://github.com/mathdroid/covid-19-api). 

---


|                             |                             |                             |
| :-------------------------: | :-------------------------: | :-------------------------: |
| ![Homepage](https://github.com/putthidaSR/covid-19-cambodia-app/blob/master/screenshots/IMG_4076.PNG) | ![World Data](https://github.com/putthidaSR/covid-19-cambodia-app/blob/master/screenshots/IMG_4077.PNG) | ![Help](https://github.com/putthidaSR/covid-19-cambodia-app/blob/master/screenshots/IMG_4078.PNG) |

---

## How to Build and Run the Project
- Install all dependencies:
  - `npm install`
  - `cd ios && pod install`
- At root directory, start the packager: `npm start`
- Run on Android: `react-native run-android`
- Run on iOS: `react-native run-ios`
