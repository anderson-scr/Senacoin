const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Promocao = mongoose.model('Promocao');
const QrCode = mongoose.model('QrCode');

exports.getAll = async (req, res, _next) => {
	let list = [];
	try {

		const items = await Item.find({id_categoria: {$in: ["62d017a1181c3910ccfd43d2", "62d017a1181c3910ccfd43d3"]}});
    items.forEach(item => {
      const withTitle = {
        title: 'Item',
        itemName: item.nome,
        start: item.data_fim,
        end: item.data_fim,
        backgroundColor: '#D95443',
        borderColor: '#D95443'
      }
      list.push(withTitle)
    })
    
		const promos = await Promocao.find({});
    promos.forEach(promo => { 
      const withTitle = {
        title: 'Promoção',
        itemName: promo.nome,
        start: promo.data_fim,
        end: promo.data_fim,
        backgroundColor: 'rgb(225, 126, 28)',
        borderColor: 'rgb(225, 126, 28)'
      }
      list.push(withTitle)
    })

		const qrcodes = await QrCode.find({});
    qrcodes.forEach(qrcode => { 
      const withTitle = {
        title: 'Qrcode',
        itemName: qrcode.nome,
        start: qrcode.data_fim,
        end: qrcode.data_fim,
        backgroundColor: '#3788D8',
        borderColor: '#3788D8'
      }
      list.push(withTitle)
    })

		if (!list.length)
			return res.status(204).json();

		res.status(200).json({success: true, data: list});
	} catch (error) {
		res.status(500).json({success: false, msg: error.message});
	}
}