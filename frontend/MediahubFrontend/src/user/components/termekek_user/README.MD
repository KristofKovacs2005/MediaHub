# Termékek weblap

## STYLE FILE: termekek.css
└Ez a fájl tartalmazza a termékek weboldal stílusát, nyelve css.

## PAGE: termekekPage.jsx
└Ez maga a weblap fájlja. Itt van meghívva azok a komponensek amelyek össze rakják a /termékek weblapot

## FILTER: termekekUserFilterFunction.jsx termekekUserFilter.jsx
├ termekekUserFilterFunction az a fájl ahol a szürő végzi el a munkáját. A fájlban kettő függvény van. Amikor hozzáadsz a szürőhöz(név vagy tag), vagy amikor kiüríted a szűrőt!
└ termekekUserFilter/komponens az a fájl ahol maga a filter user interfésze van(szó szerinti frotnend)

## TERMEK(ITEM): termekekLista_User.jsx termekUser.jsx termekekUserSection.jsx
├ termekekLista_User ez a fájl/komponens ahol a elhelyezkednek a termékek section és a filter felette
├ termekUser az a fájl/komponens ahol maga a termék kártáyja van felépítve
└ termekekUserSection ez a fájl/komponens ahol a termékek elhelyezkednek egymás mellett

## TERMEK BETÖLTÉSE: loadTermekekUser.jsx
└A loadTermekekUser fájl szerepel a termekek(itemek) betöltéséért. A fájlban végződik a szűrés elvégézése miszerint azt mutatja ki amit leszűrt a megadott adatokkal.