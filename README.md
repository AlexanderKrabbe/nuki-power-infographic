# nuki-power-infographic

En infografik med dynamiske data til at vise output for enheder i elproduktion.


## Hvordan det virker

Visningen bruger HTML, billeder og CSS til at præsentere elproducerende enheder. Noget javascript opfanger oplysninger fra `/dist/data/data.json` og viser dem på skærmen med et bestemt interval.

For at få up to date data, skal data-filen løbende overskrives med en ny `data.json`, som efterfølgende kan vises i infografikken.


## data.json

Data i data.json er skrevet i nedenstående format:
```
{
    "units": [ 
        { 
            "title_da": "Diesel-generator 1",
            "title_kl": "Diesel-generator 1 på grønlandsk",
            "kw": 20
        },
        {
            "title_da": "Diesel-generator 2",
            "title_kl": "[Diesel-generator 2 på grønlandsk]",
            "kw": 18.5
        },
        {
            "title_da": "Solceller",
            "title_kl": "[Solceller på grønlandsk]",
            "kw": 4.2
        },
        {
            "title_da": "Batteri 1",
            "title_kl": "[Batteri 1 på grønlandsk]",
            "kw": 18
        },
        {
            "title_da": "Batteri 2",
            "title_kl": "[Batteri 2 på grønlandsk]",
            "kw": 17.1
        }
    ],
    "consumer": {
        "title": "Igaliku",
        "kw": 33.6
    },
    "battery": {
        "title_da": "Batteribank",
        "title_kl": "[Batteribank på grønlandsk]",
        "voltage": 723.4,
        "charge": 38.8,
        "is_charging": true
    }
}
```


### Felter i data.json


#### units
`units` er en liste af de elproducerende enheder, vi vil have data fra. For hver enhed skal vi bruge følgende værdier:

**title_da**
En tekst i `""`, som er enhedens navn på dansk

**title_kl**
En tekst i `""`, som er enhedens navn på grønlandsk

**kw**
En tal-værdi, som angiver output fra enheden i kiloWatt.


#### consumer
`consumer` er oplysninger om det samlede output, som bygden forbruger. Dette objekt indeholder følgende værdier:

**title**
En tekst i `""`, som bygdens/byens navn. Vi antager, at det er ens på hhv. grønlandsk og dansk.

**kw**
En tal-værdi, som angiver output til bygden i kiloWatt.


#### battery
`battery` er oplysninger om batteribanken og dens status. Dette objekt indeholder følgende værdier:

**title_da**
En tekst i `""`, som er batteribankens navn på dansk

**title_kl**
En tekst i `""`, som er batteribankens navn på grønlandsk

**voltage**
En tal-værdi, som angiver hvor meget spænding, der er på batteribanken.

**charge**
En tal-værdi, som angiver hvor meget batterikapacitet, der er tilbage i %.

**is_charging**
En true/false-værdi som angiver, som batteribanken er ved at lade op eller ved at blive afladt.
Sættes til `true`, hvis batteribanken lades op.
Sættes til `false`, hvis der bruges strøm fra batteribanken.
