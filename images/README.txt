REAL PRODUCT PHOTOS GO IN THIS FOLDER
=====================================

Drop these exact filenames here when the real photos arrive:

  nabat-shampoo.jpg    -> NABAT Herbal & Organic Shampoo photo
  beldi-black-soap.jpg -> Beldi Black Soap photo
  nabat-oil.jpg        -> NABAT Hair Oil photo (when it launches)

The website already references these paths in its Open Graph / social
sharing tags and product schema, so sharing previews will pick the
photos up automatically once the files exist.

To also show a photo INSIDE a product page, replace that page's
CSS visual block (the <div class="visual"> ... </div> in the product
hero) with:

  <img src="../images/nabat-shampoo.jpg"
       alt="NABAT Herbal and Organic Shampoo 300 ml bottle"
       style="border-radius:16px; box-shadow: 0 10px 30px rgba(20,53,31,.12);">

(Use src="images/..." instead of "../images/..." on index.html and
about.html, which sit at the site root.)

Recommended: JPG, at least 900px wide, product on a clean background.
