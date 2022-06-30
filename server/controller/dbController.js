const pool = require('../connect');


//teste db
exports.teste = (req, res) =>{
	//conecta DB
	pool.getConnection((err, conn) => {
		if(err)
			throw err;
		console.log(`Conectado ao view com o ID ${conn.threadId}`);

		//utilizando a conexão
		conn.query(`SELECT u.cpf, u.usu_matricula, u.usu_email, u.usu_nome, s.st_nome, p.nome_perfil, d.uni_descricao, d.uni_cidade 
					FROM usuario u 
						left join status s on u.fk_id_status = s.id_status
						left join perfil p on u.fk_id_perfil = p.id_perfil
						left JOIN unidades d on u.fk_id_unidade = d.id_unidade;
					`, (err, rows) =>{
			//libera a conexão, quando finaliza a ação
			conn.release();			
			if(!err)
			{
				
				res.status(201).send({rows});
			}
			else
				console.log(err);
			
			console.log('os dados da tabela ocorrencia:\n', rows.slice(0, 1));
		});
	});
}