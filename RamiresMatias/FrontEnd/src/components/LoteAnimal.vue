<template>
  <b-container>
    <b-card class="mt-5">
      <b-form>
        <b-row cols="3">
          <b-col>
            <b-form-group label="Código animal:">
              <b-form-input
                type="number"
                v-model="locacao.fk_id_animal"
                placeholder="Digite o código do animal"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Código do lote:">
              <b-form-input
                type="number"
                v-model="locacao.fk_id_lote"
                placeholder="Digite o código do lote"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Data de Entrada">
              <b-form-input
                v-model="locacao.dt_entrada"
                type="date"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Data de Saída">
              <b-form-input
                v-model="locacao.dt_saida"
                type="date"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            ><b-form-group label="Data da Última Movimentação:">
              <b-form-input
                v-model="locacao.dt_ultima_movimentacao"
                type="date"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col
            ><b-form-checkbox
              v-model="locacao.ic_bezerro"
              @click="locacao.ic_bezerro = !locacao.ic_bezerro"
            >
              Ativo
            </b-form-checkbox></b-col
          >
        </b-row>
        <b-row class="mt-4 d-flex"
          ><b-col cols="1" align-self="start"
            ><b-button
              :variant="isEdit ? 'success' : 'primary'"
              size="lg"
              @click="cadastrarLocacao"
              >{{ this.isEdit ? "Salvar Edições" : "Cadastrar" }}</b-button
            ></b-col
          >
        </b-row>
      </b-form>
    </b-card>
    <hr />
    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtro"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Pesquisar resultado na tabela"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Limpar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        id="table"
        :items="locacoes"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :fields="fields"
        :filter="filter"
      >
        <template #cell(excluir)="row">
          <b-button variant="danger" @click="excluir(row.item.id)">
            Excluir
          </b-button>
        </template>
        <template #cell(editar)="row">
          <b-button variant="warning" @click="editar(row.item)">
            Editar
          </b-button>
        </template></b-table
      >
    </b-row>
    <b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      animais: [],
      lotes: [],
      locacoes: [],
      isEdit: false,
      locacao: {
        fk_id_animal: 0,
        fk_id_lote: 0,
        dt_entrada: "",
        dt_saida: "",
        dt_ultima_movimentacao: "",
        ic_bezerro: false,
      },
      perPage: 3,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "fk_id_animal",
          label: "Animal",
          formatter: (value) => {
            let ani = this.animais.find((item) => {
              if (item.id == value) {
                return item.nome;
              }
            });
            return ani.nome;
          },
        },
        {
          key: "fk_id_lote",
          label: "Lote",
          formatter: (value) => {
            let lot = this.lotes.find((item) => {
              if (item.id == value) {
                return item.desc_lote;
              }
            });
            return lot.desc_lote;
          },
        },
        {
          key: "dt_entrada",
          label: "Data de Entrada",
        },
        {
          key: "dt_saida",
          label: "Data de Saída",
        },
        {
          key: "ic_bezerro",
          label: "Ic Bezerro",
        },
        {
          key: "dt_ultima_movimentacao",
          label: "Data da Última Movimentação",
        },
        { key: "excluir", label: "Excluir" },
        { key: "editar", label: "Editar" },
      ],
      Excluir: {
        id: "Excluir",
        title: "",
        content: "",
      },
      Editar: {
        id: "Editar",
        title: "",
        content: "",
      },
    };
  },
  methods: {
    limpar() {
      this.locacao = {};
      this.id = null;
    },
    cadastrarLocacao() {
      let metodo = this.id ? "patch" : "post";
      let finalUrl = this.id ? `/${this.id}` : ``;

      this.$http[metodo](`/lotexanimal${finalUrl}`, this.locacao).then(() => {
        this.limpar();
        this.isEdit = false;
      });
    },
    editar(loc) {
      let idLoc = this.locacoes.findIndex((item) => item.id == loc.id);

      this.isEdit = true;
      this.id = this.locacoes[idLoc].id;
      this.locacao = { ...this.locacoes[idLoc] };
    },
    excluir(id) {
      this.$http
        .delete(`/lotexanimal/${id}`)
        .then(() => this.limpar())
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    rows() {
      return this.locacoes.length;
    },
  },
  created() {
    this.$http.get("/lote").then((response) => {
      const array = [];
      for (let chave in response.data) {
        let { id, num_lote, desc_lote } = response.data[chave];
        array.push({ id, num_lote, desc_lote });
      }
      this.lotes = array;
    });

    this.$http.get("/animal").then((response) => {
      const array = [];
      for (let chave in response.data) {
        let {
          id,
          fk_id_pessoa,
          id_fazenda,
          nome,
          raca,
          sexo,
          peso,
          dt_nascimento,
        } = response.data[chave];
        array.push({
          id,
          fk_id_pessoa,
          id_fazenda,
          nome,
          raca,
          sexo,
          peso,
          dt_nascimento: moment(dt_nascimento).format("DD-MM-YYYY"),
        });
      }
      this.animais = array;
    });

    this.$http.get("/lotexanimal").then((response) => {
      const array = [];
      for (let chave in response.data) {
        let {
          id,
          fk_id_animal,
          fk_id_lote,
          dt_entrada,
          dt_saida,
          dt_ultima_movimentacao,
          ic_bezerro,
        } = response.data[chave];
        array.push({
          id,
          fk_id_animal,
          fk_id_lote,
          /* Formatando as datas com a biblioteca Moment Js */
          dt_entrada: moment(dt_entrada).format("DD-MM-YYYY"),
          dt_saida: moment(dt_saida).format("DD-MM-YYYY"),
          dt_ultima_movimentacao: moment(dt_ultima_movimentacao).format(
            "DD-MM-YYYY"
          ),
          ic_bezerro,
        });
      }
      this.locacoes = array;
    });
  },
};
</script>

<style>
</style>