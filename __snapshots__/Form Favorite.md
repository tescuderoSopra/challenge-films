# `Form Favorite`

#### `show correctly`

```html
<div class="modal">
  <form
    id="formFavourite"
    name="formFavourite"
  >
    <label for="title">
      Nombre:
    </label>
    <input
      autofocus=""
      id="title"
      placeholder="Escriba el nombre"
      required=""
      type="text"
    >
    <label for="overview">
      Descripción:
    </label>
    <textarea
      id="overview"
      placeholder="Escriba el su descripción"
    >
    </textarea>
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
    <div id="backdrop_path">
      <input
        id="back_file"
        name="files"
        type="file"
      >
      <label for="back_file">
        <strong>
          Elija un fichero
        </strong>
      </label>
    </div>
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

