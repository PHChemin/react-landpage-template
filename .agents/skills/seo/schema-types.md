# Tipos schema.org por segmento

Use o tipo **mais específico** que existe. Na dúvida entre dois, o mais específico; se nenhum serve, `LocalBusiness` (tem endereço/atende numa região) ou `ProfessionalService`.

| Segmento | `schemaType` |
| --- | --- |
| Confeitaria, padaria | `Bakery` |
| Café | `CafeOrCoffeeShop` |
| Restaurante, hamburgueria, bar | `Restaurant` (ou `BarOrPub`, `FastFoodRestaurant`) |
| Barbearia, cabeleireiro | `HairSalon` |
| Estética, manicure, spa | `BeautySalon` (ou `DaySpa`, `NailSalon`) |
| Dentista | `Dentist` |
| Clínica médica | `MedicalClinic` |
| Médico(a) | `Physician` |
| Psicólogo(a), terapeuta, nutricionista autônomo | `Person` (profissional) ou `ProfessionalService` (consultório com marca) |
| Advocacia | `LegalService` / `Attorney` |
| Contabilidade | `AccountingService` |
| Oficina mecânica | `AutoRepair` |
| Pet shop / veterinário | `PetStore` / `VeterinaryCare` |
| Academia, personal com espaço | `HealthClub` / `SportsActivityLocation` |
| Escola, curso | `EducationalOrganization` |
| Loja física | `Store` (ou subtipo: `ClothingStore`, `FlowerShop`…) |
| Freelancer, estúdio, agência | `ProfessionalService` ou `Person` |
| Marca sem atendimento local | `Organization` |

Lista completa: <https://schema.org/LocalBusiness> (seção "More specific Types").

## Acréscimos comuns

O plugin gera a entidade base. Para os blocos abaixo, estenda `jsonLd()` em `scripts/seo-plugin.ts` lendo de `src/content.ts`/`site.config.ts` — o dado precisa estar visível na página.

### Profissional com registro

```json
{
  "@type": "Person",
  "name": "Nome Sobrenome",
  "jobTitle": "Psicóloga clínica",
  "identifier": { "@type": "PropertyValue", "name": "CRP", "value": "06/000000" },
  "knowsAbout": ["Ansiedade", "Transtorno obsessivo-compulsivo"],
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universidade X" }
}
```

### FAQ

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O atendimento online funciona como o presencial?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. A sessão dura 50 minutos por videochamada…" }
    }
  ]
}
```

### Serviços oferecidos

```json
{
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corte masculino" } }
    ]
  }
}
```

### Negócio local completo

```json
{
  "@type": "HairSalon",
  "address": { "@type": "PostalAddress", "streetAddress": "Rua X, 123", "addressLocality": "Curitiba", "addressRegion": "PR", "postalCode": "80000-000", "addressCountry": "BR" },
  "geo": { "@type": "GeoCoordinates", "latitude": -25.43, "longitude": -49.27 },
  "openingHours": ["Tu-Fr 09:00-19:00", "Sa 09:00-14:00"],
  "priceRange": "$$",
  "areaServed": ["Batel", "Água Verde"],
  "hasMap": "https://maps.google.com/?cid=…"
}
```
