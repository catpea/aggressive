<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
<div class="grid">
    <form>
    <label><input type="radio" name="layout" id="blog" checked> Blog layout</label>
    <label><input type="radio" name="layout" id="grid"> Grid layout</label>
  </form>

<div class="grid-container">
  <header>Headerv</header>
  <main>Content</main>
   <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>

</div>
</body>
</html>






/* Default layout - No aside */
.grid-container {
  display: grid;

  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
  grid-template-columns: 1fr;
  background: red;
   transition: all 0.3s ease; /* Adding transition for smooth resizing */
}

/* Layout with aside */
.grid-container:has(> aside.shown) {
  grid-template-areas:
    "header header"
    "content sidebar"
    "footer footer";
  grid-template-columns: 1fr 200px ;
  background: green;
}

body:has(#blog:checked) .grid-container {
  grid-template-areas:
    "header header"
    "content sidebar"
    "footer footer";
  grid-template-columns: 1fr 200px ;
  background: purple;
}
body:has(#blog:checked) aside {
   display: block;
}
/* Basic styles for grid items */
header, main, aside, footer {
  padding: 1rem;
  border: 1px solid #ddd;
}

header {
  grid-area: header;
}
main {
  grid-area: content;
   transition: max-width 0.3s ease; /* Animate width change */
}
aside {
  grid-area: sidebar;
  display: none;
}
footer {
  grid-area: footer;
}
.shown {
    display: block; /* Completely removes the element from the layout */
}








REVISED

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Dynamic Grid Layout</title>
    <style>
        /* Default layout - No aside */
        .grid-container {
            display: grid;
            grid-template-areas:
                "header header"
                "content content"
                "footer footer";
            grid-template-columns: 1fr;
            background: red;
            transition: all 0.3s ease;
        }

        /* Layout with aside */
        body:has(#blog:checked) .grid-container {
            grid-template-areas:
                "header header"
                "content sidebar"
                "footer footer";
            grid-template-columns: 1fr 200px;
            background: purple;
        }

        body:has(#blog:checked) aside {
            display: block; /* Show sidebar */
        }

        /* Basic styles for grid items */
        header, main, aside, footer {
            padding: 1rem;
            border: 1px solid #ddd;
        }

        header {
            grid-area: header;
        }
        main {
            grid-area: content;
        }
        aside {
            grid-area: sidebar;
            display: none; /* Initially hidden */
        }
        footer {
            grid-area: footer;
        }
    </style>
</head>
<body>
    <div class="grid">
        <form>
            <label><input type="radio" name="layout" id="blog" checked> Blog layout</label>
            <label><input type="radio" name="layout" id="grid"> Grid layout</label>
        </form>

        <div class="grid-container">
            <header>Header</header>
            <main>Content</main>
            <aside>Sidebar</aside>
            <footer>Footer</footer>
        </div>
    </div>
</body>
</html>
