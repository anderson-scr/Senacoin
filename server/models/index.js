const mongoose = require('mongoose');
const aluno = require('./aluno');
const area = require('./area');
const categoria = require('./categoria');
const colaborador = require('./colaborador');
const cotacao = require('./cotacao');
const item = require('./item');
const perfil = require('./perfil');
const permissoes = require('./permissoes');
const promocao = require('./promocao');
const qrcode = require('./qrcode');
const senacoin = require('./senacoin');
const subcategoria = require('./subcategoria');
const transacao = require('./transacao');
const unidade = require('./unidade');


mongoose.model("Aluno", aluno.AlunoSchema);
mongoose.model("AuditoriaAluno", aluno.AuditoriaAlunoSchema);

mongoose.model("Area", area.AreaSchema);
mongoose.model("AuditoriaArea", area.AuditoriaAreaSchema);

mongoose.model("Categoria", categoria.CategoriaSchema);

mongoose.model("Colaborador", colaborador.ColaboradorSchema);
mongoose.model("AuditoriaColaborador", colaborador.AuditoriaColaboradorSchema);

mongoose.model("Cotacao", cotacao.CotacaoSchema);
mongoose.model("AuditoriaCotacao", cotacao.AuditoriaCotacaoSchema);

mongoose.model("Item", item.ItemSchema);
mongoose.model("AuditoriaItem", item.AuditoriaItemSchema);

mongoose.model("Perfil", perfil.PerfilSchema);
mongoose.model("AuditoriaPerfil", perfil.AuditoriaPerfilSchema);

mongoose.model("Permissoes", permissoes.PermissoesSchema);

mongoose.model("Promocao", promocao.PromocaoSchema);
mongoose.model("AuditoriaPromocao", promocao.AuditoriaPromocaoSchema);

mongoose.model("QrCode", qrcode.QrCodeSchema);
mongoose.model("AuditoriaQrCode", qrcode.AuditoriaQrCodeSchema);

mongoose.model("SenaCoin", senacoin.SenaCoinSchema);
mongoose.model("AuditoriaSenaCoin", senacoin.AuditoriaSenaCoinSchema);

mongoose.model("SubCategoria", subcategoria.SubCategoriaSchema);
mongoose.model("AuditoriaSubCategoria", subcategoria.AuditoriaSubCategoriaSchema);

mongoose.model("Transacao", transacao.TransacaoSchema);

mongoose.model("Unidade", unidade.UnidadeSchema);
mongoose.model("AuditoriaUnidade", unidade.AuditoriaUnidadeSchema);