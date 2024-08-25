# Mesquito (BETA)
The annoying WAF loader

![GitHub all releases](https://img.shields.io/github/downloads/KindleModding/Mesquito/total?style=for-the-badge)
![GitHub tag (with filter)](https://img.shields.io/github/v/tag/KindleModding/Mesquito?style=for-the-badge&label=Latest%20Version)
![GitHub](https://img.shields.io/github/license/KindleModding/Mesquito?style=for-the-badge)


| ![Mesquito](https://github.com/KindleModding/Mesquito/assets/69104218/d4948414-bd63-4387-b9bb-f8d83b6915cb) | ![KChess](https://github.com/KindleModding/Mesquito/assets/69104218/e696a49b-ee10-442f-ba83-bc17f0101210) |
|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|


Join Our Discord Server: [https://dsc.gg/kindle-modding](https://dsc.gg/kindle-modding)

## What is Mesquito
Mesquito is **NOT** a jailbreak, rather, Mesquito is a way to run userspace limited WAFs (Web Application Framworks?) on all firmwares `<= 5.16.21` (this may not always be up to date make sure to try ;))

Note, that Mesquito is "semi-untethered" meaning that if you hard restart your Kindle, you may lose it, it might also randomly disapear by itself during cache refresh (assuming you keep wifi on)*

## What is a WAF?
Similar to KWebBrew apps, a WAF is effectively just a locally stored webpage, *however*, unlike KWebBrew apps, WAFs run through Mesquito

## How to install
1. Turn on airplane mode on your Kindle
2. Plug your Kindle into your PC
3. Extract the `Mesquito.zip` folder from your PC to the root of your Kindle
4. Eject your Kindle and restart it (Hold down the button for 10s and select `restart`)
5. Open the store
6. When prompted, turn on WiFi
7. Done!
> Note: the scale may be wrong, to fix this simply click on the `three dots` on the `top navbar` and select `Home`

## How does it work?
Mesquito works by overriding the local cache of a pre-existing WAF, in this case, the store. Mesquito does not allow for piracy, it's literally impossible and it does not tamper with any other parts of the Kindle. There is only one way to patch Mesquito, and if Amazon/LAB126 chooses to, they would literally only be attacking the Kindle Homebrew Community.

## How can I make my own WAFs?
Please reffer to the [wiki](https://kindlemodding.github.io/docs/mesquito/development/)

### How to install (PERSISTENTLY)
Something interesting I discovered, if you reset your Kindle, and perform the installation steps without opening the regular store beforehand, it is fully persistent, even after a hard restart. I plan on doing more investiagion to try to replicate this without resetting your Kindle, perhaps something in the `lipc` calls can disable store updating...
