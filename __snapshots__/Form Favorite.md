# `Form Favorite`

#### `show correctly`

```html
<div class="modal">
  <form
    id="formFavourite"
    name="formFavourite"
  >
    <label for="name">
      Nombre:
    </label>
    <input
      autofocus=""
      id="name"
      placeholder="Escriba el nombre"
      required=""
      type="text"
    >
    <label for="media_type">
      Tipo:
    </label>
    <select id="media_type">
      <option value="">
        *
      </option>
      <option value="tv">
        TV
      </option>
      <option value="movie">
        Película
      </option>
    </select>
    <label for="myProvider">
      Proveedor:
    </label>
    <input
      id="myProvider"
      placeholder="Proveedor"
      type="text"
    >
    <button class="addBtn">
      Añadir
    </button>
    <button class="saveButton">
      Guardar
    </button>
  </form>
  <button class="closeModal">
    X
  </button>
</div>

```

