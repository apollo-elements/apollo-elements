---
name: Partners
partners:
  - name: Packt
    img: packt.png
  - name: Devpost
    img: devpost.png
  - name: RSA
    img: rsa.png
  - name: Feitian We Build Security
    img: feitian.jpeg
  - name: Developers Road Ahead
    img: developersroad.jpeg

---

## Our Partners

<section>
{%- for partner in partners -%}
  <img alt="{{ partner.name }}" src="/decks/azconf-dev-2021/azconf-assets/partners-{{ partner.img }}"/>
{%- endfor -%}
</section>
