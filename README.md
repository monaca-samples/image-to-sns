# Image To SNS

## What

To generate AI images and shares to your social media platform.

## Javascript Framework

It uses `Framework7` and `React` as UI and Javascript framework.

## Cordova Plugin

It uses `cordova-plugin-x-socialsharing` to share images to social media platform.

## AI Model

It uses open-source model from [Huggingface](https://huggingface.co/) to generate AI image. The model is `stable-diffusion-xl-base-1.0`. You need to signup to [Huggingface](https://huggingface.co/join) and get your own [API key](https://huggingface.co/settings/tokens). You can replace your own API Key at [here](/src/js/util.js).

## How to Run

```bash
npm install
npm run dev
```

Note: To use the cordova plugins, you need to run on mobile phone. You can do it with [Monaca](https://monaca.io/).

## Ref

- [Cordova Plugin](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
- [AI Model](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
- [Javascript Framework](https://framework7.io/react/)
