---
name: Sponsors
sponsors:
  - title: Title Sponsor
    name: EY Building a Better World
    img: ey
  - title: Gold Sponsor
    name: Microsoft
    img: microsoft
  - title: Community Partner
    name: elastic
    img: elastic

---

{%- for sponsor in sponsors -%}
  <figure>
    <figcaption>{{ sponsor.title }}</figcaption>
    <img alt="{{ sponsor.name }}" src="/decks/azconf-dev-2021/azconf-assets/sponsors-{{ sponsor.img }}.png"/>
  </figure>
{%- endfor -%}
