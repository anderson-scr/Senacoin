const mongoose = require('mongoose');
const area = require('./area');
const categoria = require('./categoria');
const estoque = require('./estoque');
const item = require('./item');
const perfil = require('./perfil');
const promocao = require('./promocao');
const qrcode = require('./qrcode');
const senacoin = require('./senacoin');
const status = require('./status');
const transacao = require('./transacao');
const unidade = require('./unidade');
const colaborador = require('./colaborador');
const aluno = require('./aluno');


mongoose.model("Area", area.AreaSchema);

mongoose.model("Categoria", categoria.CategoriaSchema);
mongoose.model("SubCategoria", categoria.SubCategoriaSchema);

mongoose.model("Estoque", estoque.EstoqueSchema);
mongoose.model("HistoricoEstoque", estoque.HistoricoEstoqueSchema);

mongoose.model("Item", item.ItemSchema);

mongoose.model("Perfil", perfil.PerfilSchema);

mongoose.model("Promocao", promocao.PromocaoSchema);

mongoose.model("QrCode", qrcode.QrCodeSchema);

mongoose.model("SenaCoin", senacoin.SenaCoinSchema);

mongoose.model("Status", status.StatusSchema);

mongoose.model("Transacao", transacao.TransacaoSchema);
mongoose.model("HistoricoTransacao", transacao.HistoricoTransacaoSchema);

mongoose.model("Unidade", unidade.UnidadeSchema);

mongoose.model("Colaborador", colaborador.ColaboradorSchema);

mongoose.model("Aluno", aluno.AlunoSchema);
mongoose.model("CarteiraPontos", aluno.CarteiraPontosSchema);