  -- phpMyAdmin SQL Dump
  -- version 5.2.0
  -- https://www.phpmyadmin.net/
  --
  -- Host: 127.0.0.1
  -- Tempo de geração: 15-Jul-2022 às 14:40
  -- Versão do servidor: 10.4.24-MariaDB
  -- versão do PHP: 7.4.29

  SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
  START TRANSACTION;
  SET time_zone = "+00:00";


  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
  --
  -- Banco de dados: `phpmyadmin`
  --
  CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
  USE `phpmyadmin`;

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__bookmark`
  --

  CREATE TABLE `pma__bookmark` (
    `id` int(10) UNSIGNED NOT NULL,
    `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
    `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
    `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
    `query` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__central_columns`
  --

  CREATE TABLE `pma__central_columns` (
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
    `col_length` text COLLATE utf8_bin DEFAULT NULL,
    `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
    `col_isNull` tinyint(1) NOT NULL,
    `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
    `col_default` text COLLATE utf8_bin DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__column_info`
  --

  CREATE TABLE `pma__column_info` (
    `id` int(5) UNSIGNED NOT NULL,
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
    `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
    `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
    `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
    `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
    `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__designer_settings`
  --

  CREATE TABLE `pma__designer_settings` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `settings_data` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__export_templates`
  --

  CREATE TABLE `pma__export_templates` (
    `id` int(5) UNSIGNED NOT NULL,
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
    `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `template_data` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__favorite`
  --

  CREATE TABLE `pma__favorite` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `tables` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__history`
  --

  CREATE TABLE `pma__history` (
    `id` bigint(20) UNSIGNED NOT NULL,
    `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
    `sqlquery` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__navigationhiding`
  --

  CREATE TABLE `pma__navigationhiding` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__pdf_pages`
  --

  CREATE TABLE `pma__pdf_pages` (
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `page_nr` int(10) UNSIGNED NOT NULL,
    `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__recent`
  --

  CREATE TABLE `pma__recent` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `tables` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

  --
  -- Extraindo dados da tabela `pma__recent`
  --

  INSERT INTO `pma__recent` (`username`, `tables`) VALUES
  ('root', '[{\"db\":\"senacoin\",\"table\":\"vw_usuarios\"},{\"db\":\"senacoin\",\"table\":\"vw_estoque_atual\"},{\"db\":\"senacoin\",\"table\":\"vw_categoria\"},{\"db\":\"senacoin\",\"table\":\"vw_area\"},{\"db\":\"senacoin\",\"table\":\"vw_unidades\"},{\"db\":\"senacoin\",\"table\":\"vw_subcategoria\"},{\"db\":\"senacoin\",\"table\":\"vw_qr_code\"},{\"db\":\"senacoin\",\"table\":\"vw_promocoes\"},{\"db\":\"senacoin\",\"table\":\"vw_perfil\"},{\"db\":\"senacoin\",\"table\":\"vw_kardex_posicao_atual_somada\"}]');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__relation`
  --

  CREATE TABLE `pma__relation` (
    `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__savedsearches`
  --

  CREATE TABLE `pma__savedsearches` (
    `id` int(5) UNSIGNED NOT NULL,
    `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `search_data` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__table_coords`
  --

  CREATE TABLE `pma__table_coords` (
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `pdf_page_number` int(11) NOT NULL DEFAULT 0,
    `x` float UNSIGNED NOT NULL DEFAULT 0,
    `y` float UNSIGNED NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__table_info`
  --

  CREATE TABLE `pma__table_info` (
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
    `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__table_uiprefs`
  --

  CREATE TABLE `pma__table_uiprefs` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `prefs` text COLLATE utf8_bin NOT NULL,
    `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__tracking`
  --

  CREATE TABLE `pma__tracking` (
    `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
    `version` int(10) UNSIGNED NOT NULL,
    `date_created` datetime NOT NULL,
    `date_updated` datetime NOT NULL,
    `schema_snapshot` text COLLATE utf8_bin NOT NULL,
    `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
    `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
    `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
    `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__userconfig`
  --

  CREATE TABLE `pma__userconfig` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `config_data` text COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

  --
  -- Extraindo dados da tabela `pma__userconfig`
  --

  INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
  ('root', '2022-07-14 21:42:02', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"pt\"}');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__usergroups`
  --

  CREATE TABLE `pma__usergroups` (
    `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
    `tab` varchar(64) COLLATE utf8_bin NOT NULL,
    `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `pma__users`
  --

  CREATE TABLE `pma__users` (
    `username` varchar(64) COLLATE utf8_bin NOT NULL,
    `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

  --
  -- Índices para tabelas despejadas
  --

  --
  -- Índices para tabela `pma__bookmark`
  --
  ALTER TABLE `pma__bookmark`
    ADD PRIMARY KEY (`id`);

  --
  -- Índices para tabela `pma__central_columns`
  --
  ALTER TABLE `pma__central_columns`
    ADD PRIMARY KEY (`db_name`,`col_name`);

  --
  -- Índices para tabela `pma__column_info`
  --
  ALTER TABLE `pma__column_info`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

  --
  -- Índices para tabela `pma__designer_settings`
  --
  ALTER TABLE `pma__designer_settings`
    ADD PRIMARY KEY (`username`);

  --
  -- Índices para tabela `pma__export_templates`
  --
  ALTER TABLE `pma__export_templates`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

  --
  -- Índices para tabela `pma__favorite`
  --
  ALTER TABLE `pma__favorite`
    ADD PRIMARY KEY (`username`);

  --
  -- Índices para tabela `pma__history`
  --
  ALTER TABLE `pma__history`
    ADD PRIMARY KEY (`id`),
    ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

  --
  -- Índices para tabela `pma__navigationhiding`
  --
  ALTER TABLE `pma__navigationhiding`
    ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

  --
  -- Índices para tabela `pma__pdf_pages`
  --
  ALTER TABLE `pma__pdf_pages`
    ADD PRIMARY KEY (`page_nr`),
    ADD KEY `db_name` (`db_name`);

  --
  -- Índices para tabela `pma__recent`
  --
  ALTER TABLE `pma__recent`
    ADD PRIMARY KEY (`username`);

  --
  -- Índices para tabela `pma__relation`
  --
  ALTER TABLE `pma__relation`
    ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
    ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

  --
  -- Índices para tabela `pma__savedsearches`
  --
  ALTER TABLE `pma__savedsearches`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

  --
  -- Índices para tabela `pma__table_coords`
  --
  ALTER TABLE `pma__table_coords`
    ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

  --
  -- Índices para tabela `pma__table_info`
  --
  ALTER TABLE `pma__table_info`
    ADD PRIMARY KEY (`db_name`,`table_name`);

  --
  -- Índices para tabela `pma__table_uiprefs`
  --
  ALTER TABLE `pma__table_uiprefs`
    ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

  --
  -- Índices para tabela `pma__tracking`
  --
  ALTER TABLE `pma__tracking`
    ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

  --
  -- Índices para tabela `pma__userconfig`
  --
  ALTER TABLE `pma__userconfig`
    ADD PRIMARY KEY (`username`);

  --
  -- Índices para tabela `pma__usergroups`
  --
  ALTER TABLE `pma__usergroups`
    ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

  --
  -- Índices para tabela `pma__users`
  --
  ALTER TABLE `pma__users`
    ADD PRIMARY KEY (`username`,`usergroup`);

  --
  -- AUTO_INCREMENT de tabelas despejadas
  --

  --
  -- AUTO_INCREMENT de tabela `pma__bookmark`
  --
  ALTER TABLE `pma__bookmark`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- AUTO_INCREMENT de tabela `pma__column_info`
  --
  ALTER TABLE `pma__column_info`
    MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- AUTO_INCREMENT de tabela `pma__export_templates`
  --
  ALTER TABLE `pma__export_templates`
    MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- AUTO_INCREMENT de tabela `pma__history`
  --
  ALTER TABLE `pma__history`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- AUTO_INCREMENT de tabela `pma__pdf_pages`
  --
  ALTER TABLE `pma__pdf_pages`
    MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- AUTO_INCREMENT de tabela `pma__savedsearches`
  --
  ALTER TABLE `pma__savedsearches`
    MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

  --
  -- Banco de dados: `senac-portifolio`
  --

  CREATE DATABASE IF NOT EXISTS `senac_portifolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  USE `senac_portifolio`;

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `usuarios`
  --

  CREATE TABLE `usuarios` (
    `id` int(11) NOT NULL,
    `login` varchar(25) NOT NULL,
    `senha` varchar(50) NOT NULL,
    `id_status` int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `usuarios`
  --

  INSERT INTO `usuarios` (`id`, `login`, `senha`, `id_status`) VALUES
  (1, 'teste@teste.com.br', '1234567890', NULL),
  (2, 'teste01@teste.com.br', '0123456789', 0);

  --
  -- Índices para tabelas despejadas
  --

  --
  -- Índices para tabela `usuarios`
  --
  ALTER TABLE `usuarios`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `UQ_login_usuario` (`login`);

  --
  -- AUTO_INCREMENT de tabelas despejadas
  --

  --
  -- AUTO_INCREMENT de tabela `usuarios`
  --
  ALTER TABLE `usuarios`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- Banco de dados: `senacoin`
  --
  CREATE DATABASE IF NOT EXISTS `senacoin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  USE `senacoin`;

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `area`
  --

  CREATE TABLE `area` (
    `id_area` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `ar_titulo` varchar(50) NOT NULL,
    `ar_obs` text DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `area`
  --

  INSERT INTO `area` (`id_area`, `fk_id_status`, `fk_id_unidade`, `ar_titulo`, `ar_obs`) VALUES
  (1, 1, 1, 'Beleza', '1'),
  (2, 1, 1, 'Saude', '1'),
  (3, 1, 1, 'Gastronomia', '1'),
  (4, 1, 1, 'Turismo', '1'),
  (5, 1, 1, 'Comércio', '1'),
  (6, 1, 1, 'Gestão', '1'),
  (7, 1, 1, 'TI', '1');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `carteira_digital`
  --

  CREATE TABLE `carteira_digital` (
    `id_carteira` int(11) NOT NULL,
    `fk_id_transacao` int(11) NOT NULL,
    `cd_saldo` float NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `carteira_digital`
  --

  INSERT INTO `carteira_digital` (`id_carteira`, `fk_id_transacao`, `cd_saldo`) VALUES
  (1, 3, 5252),
  (2, 4, 6352);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `categoria`
  --

  CREATE TABLE `categoria` (
    `id_categoria` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `cat_titulo` varchar(50) NOT NULL,
    `cat_observacao` text DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `categoria`
  --

  INSERT INTO `categoria` (`id_categoria`, `fk_id_status`, `fk_id_unidade`, `cat_titulo`, `cat_observacao`) VALUES
  (1, 1, 1, 'Produtos', NULL),
  (2, 1, 1, 'Serviços', NULL),
  (3, 1, 1, 'Eventos', NULL);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `estoque`
  --

  CREATE TABLE `estoque` (
    `fk_id_item` int(11) NOT NULL,
    `fk_cpf` varchar(11) NOT NULL,
    `it_qtde` int(11) NOT NULL,
    `est_dt_cad` date NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `estoque`
  --

  INSERT INTO `estoque` (`fk_id_item`, `fk_cpf`, `it_qtde`, `est_dt_cad`) VALUES
  (1, '00000000002', 25, '2022-05-26'),
  (2, '00000000002', 7, '2022-05-26');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `extrato`
  --

  CREATE TABLE `extrato` (
    `fk_id_transacao` int(11) NOT NULL,
    `ext_data` datetime NOT NULL DEFAULT current_timestamp(),
    `ext_tipo` tinyint(1) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `extrato`
  --

  INSERT INTO `extrato` (`fk_id_transacao`, `ext_data`, `ext_tipo`) VALUES
  (3, '2022-05-31 11:03:08', 1),
  (4, '2022-05-31 11:03:08', 1);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `itens`
  --

  CREATE TABLE `itens` (
    `id_item` int(11) NOT NULL,
    `fk_id_area` int(11) NOT NULL,
    `fk_id_categoria` int(11) NOT NULL,
    `fk_id_subcat` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `it_titulo` varchar(50) NOT NULL,
    `it_descricao` text NOT NULL,
    `it_pontos` float DEFAULT NULL,
    `it_imagem` varchar(255) DEFAULT NULL,
    `it_dt_inicio` datetime DEFAULT current_timestamp(),
    `it_dt_fim` datetime DEFAULT current_timestamp(),
    `it_observacao` text DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `itens`
  --

  INSERT INTO `itens` (`id_item`, `fk_id_area`, `fk_id_categoria`, `fk_id_subcat`, `fk_id_status`, `fk_id_unidade`, `it_titulo`, `it_descricao`, `it_pontos`, `it_imagem`, `it_dt_inicio`, `it_dt_fim`, `it_observacao`) VALUES
  (1, 1, 1, 2, 1, 1, 'Camiseta Dia dos Namorados Salão de Beleza', '.', NULL, NULL, '2022-05-20 11:05:43', '2022-05-20 11:05:43', NULL),
  (2, 3, 1, 1, 1, 1, 'Garrafa promocional Gastronomia', '.', NULL, NULL, '2022-05-20 11:05:43', '2022-05-20 11:05:43', NULL);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `kardex`
  --

  CREATE TABLE `kardex` (
    `id_kardex` int(11) NOT NULL,
    `fk_id_item` int(11) NOT NULL,
    `fk_cpf` varchar(11) NOT NULL,
    `kar_dt_cad` date NOT NULL,
    `kar_qtde_item` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `kardex`
  --

  INSERT INTO `kardex` (`id_kardex`, `fk_id_item`, `fk_cpf`, `kar_dt_cad`, `kar_qtde_item`) VALUES
  (1, 1, '00000000002', '2022-05-26', 1),
  (2, 2, '00000000002', '2022-05-26', 4),
  (3, 1, '00000000002', '2022-05-26', 23),
  (4, 2, '00000000002', '2022-05-26', 3),
  (5, 1, '00000000002', '2022-05-26', 1);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `perfil`
  --

  CREATE TABLE `perfil` (
    `id_perfil` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `nome_perfil` varchar(20) NOT NULL,
    `cad_perfil` tinyint(1) NOT NULL,
    `cad_area` tinyint(1) NOT NULL,
    `cad_cat` tinyint(1) NOT NULL,
    `cad_subcat` tinyint(1) NOT NULL,
    `cad_usu` tinyint(1) NOT NULL,
    `cad_prom` tinyint(1) NOT NULL,
    `cad_unidades` tinyint(1) NOT NULL,
    `cad_manter_itens` tinyint(1) NOT NULL,
    `gerar_relatorios` tinyint(1) NOT NULL,
    `acesso_adm` tinyint(1) NOT NULL,
    `gerenciar_usu` tinyint(1) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `perfil`
  --

  INSERT INTO `perfil` (`id_perfil`, `fk_id_status`, `fk_id_unidade`, `nome_perfil`, `cad_perfil`, `cad_area`, `cad_cat`, `cad_subcat`, `cad_usu`, `cad_prom`, `cad_unidades`, `cad_manter_itens`, `gerar_relatorios`, `acesso_adm`, `gerenciar_usu`) VALUES
  (1, 1, 1, 'Administrador', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
  (2, 1, 1, 'Suporte', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
  (3, 1, 1, 'Colaborador', 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0),
  (4, 1, 1, 'Alunos', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `promocoes`
  --

  CREATE TABLE `promocoes` (
    `id_promocao` int(11) NOT NULL,
    `fk_id_item` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `fk_cpf` varchar(11) NOT NULL,
    `prom_titulo` varchar(50) NOT NULL,
    `promo_descricao` varchar(50) NOT NULL,
    `prom_pontos` float NOT NULL,
    `prom_desc` float NOT NULL,
    `prom_quantidade` int(11) NOT NULL,
    `prom_imagem` varchar(255) NOT NULL,
    `prom_dt_inicio` date NOT NULL,
    `promo_dt_fim` date NOT NULL,
    `promo_observacao` text NOT NULL,
    `fk_id_status` int(11) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `promocoes`
  --

  INSERT INTO `promocoes` (`id_promocao`, `fk_id_item`, `fk_id_unidade`, `fk_cpf`, `prom_titulo`, `promo_descricao`, `prom_pontos`, `prom_desc`, `prom_quantidade`, `prom_imagem`, `prom_dt_inicio`, `promo_dt_fim`, `promo_observacao`, `fk_id_status`) VALUES
  (1, 2, 1, '00000000002', 'Garrafa Promocional SENAC MS', 'Campanha Dias da Mães', 123, 10, 15, 'C:/fingi/que/e_um/caminho', '2022-05-01', '2022-05-31', '.', 1);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `qr_code`
  --

  CREATE TABLE `qr_code` (
    `id_qrcode` int(11) NOT NULL,
    `fk_id_item` int(11) NOT NULL,
    `fk_cpf` varchar(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `qr_titulo` varchar(50) NOT NULL,
    `qr_descricao` varchar(50) NOT NULL,
    `qr_imagem` varchar(255) DEFAULT NULL,
    `qr_link` varchar(250) NOT NULL,
    `qr_img_link` varchar(255) NOT NULL,
    `qr_dt_inicio` date NOT NULL,
    `qr_dt_fim` date NOT NULL,
    `fk_id_senacoin` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `qr_observacao` text DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `qr_code`
  --

  INSERT INTO `qr_code` (`id_qrcode`, `fk_id_item`, `fk_cpf`, `fk_id_unidade`, `qr_titulo`, `qr_descricao`, `qr_imagem`, `qr_link`, `qr_img_link`, `qr_dt_inicio`, `qr_dt_fim`, `fk_id_senacoin`, `fk_id_status`, `qr_observacao`) VALUES
  (1, 2, '00000000002', 1, 'Teste QR-Code', 'Testando QR-Code', NULL, '.', '', '2022-05-31', '2022-08-31', 1, 1, NULL);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `senacoin`
  --

  CREATE TABLE `senacoin` (
    `id_senacoin` int(11) NOT NULL,
    `sen_dt_inicio` date NOT NULL,
    `sen_dt_fim` date NOT NULL,
    `sen_pontos` float NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `senacoin`
  --

  INSERT INTO `senacoin` (`id_senacoin`, `sen_dt_inicio`, `sen_dt_fim`, `sen_pontos`) VALUES
  (1, '2022-05-26', '2022-05-26', 1),
  (2, '2022-05-20', '2022-07-31', 5000),
  (3, '2022-05-27', '2022-06-18', 5252),
  (4, '2022-06-03', '2022-06-25', 6352);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `status`
  --

  CREATE TABLE `status` (
    `id_status` int(11) NOT NULL,
    `st_nome` varchar(25) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `status`
  --

  INSERT INTO `status` (`id_status`, `st_nome`) VALUES
  (1, 'Ativado'),
  (4, 'Em Analise'),
  (2, 'Inativo'),
  (3, 'Suspenso');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `subcategoria`
  --

  CREATE TABLE `subcategoria` (
    `id_subcat` int(11) NOT NULL,
    `sc_titulo` varchar(50) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `sc_observacao` text NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `subcategoria`
  --

  INSERT INTO `subcategoria` (`id_subcat`, `sc_titulo`, `fk_id_status`, `fk_id_unidade`, `sc_observacao`) VALUES
  (1, 'Squeezie 410ml Marca Senac MS', 1, 1, ''),
  (2, 'Camiseta Promocional Dia dos Namorados', 1, 1, '');

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `transacao`
  --

  CREATE TABLE `transacao` (
    `id_transacao` int(11) NOT NULL,
    `fk_cpf` varchar(11) NOT NULL,
    `fk_id_senacoin` int(11) NOT NULL,
    `fk_id_item` int(11) DEFAULT NULL,
    `fk_id_promocao` int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `transacao`
  --

  INSERT INTO `transacao` (`id_transacao`, `fk_cpf`, `fk_id_senacoin`, `fk_id_item`, `fk_id_promocao`) VALUES
  (3, '00000000003', 2, NULL, NULL),
  (4, '00000000002', 3, NULL, NULL);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `unidades`
  --

  CREATE TABLE `unidades` (
    `id_unidade` int(11) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `uni_descricao` varchar(50) NOT NULL,
    `uni_cidade` varchar(255) NOT NULL,
    `uni_uf` varchar(2) NOT NULL,
    `uni_endereco` varchar(255) NOT NULL,
    `uni_telefone` varchar(14) DEFAULT NULL,
    `uni_resposavel` varchar(50) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `unidades`
  --

  INSERT INTO `unidades` (`id_unidade`, `fk_id_status`, `uni_descricao`, `uni_cidade`, `uni_uf`, `uni_endereco`, `uni_telefone`, `uni_resposavel`) VALUES
  (1, 1, 'HUB ACADEMY', 'Campo Grande', 'MS', 'Rua 26, de Agosto', NULL, 'Jordana'),
  (2, 1, 'Unidade de Corumba', 'Corumbá', 'MS', 'R Tal', NULL, NULL);

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `usuario`
  --

  CREATE TABLE `usuario` (
    `cpf` varchar(11) NOT NULL,
    `usu_matricula` varchar(20) NOT NULL,
    `fk_id_status` int(11) NOT NULL,
    `fk_id_perfil` int(11) NOT NULL,
    `fk_id_unidade` int(11) NOT NULL,
    `usu_nome` varchar(255) NOT NULL,
    `usu_apelido` varchar(25) DEFAULT NULL,
    `usu_email` varchar(255) NOT NULL,
    `usu_senha` varchar(255) NOT NULL,
    `usu_telefone` varchar(20) DEFAULT NULL,
    `usu_dt_nascimento` date NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `usuario`
  --

  INSERT INTO `usuario` (`cpf`, `usu_matricula`, `fk_id_status`, `fk_id_perfil`, `fk_id_unidade`, `usu_nome`, `usu_apelido`, `usu_email`, `usu_senha`, `usu_telefone`, `usu_dt_nascimento`) VALUES
  ('00000000000', '00000000000', 1, 1, 1, 'Administrador de Sistemas', 'Adm', 'adm@ms.senac.br', '1234567890', NULL, '1990-01-01'),
  ('00000000001', '00000000001', 1, 2, 1, 'Suporte de Sistemas', 'Help Desk', 'helpdesk@ms.senac.br', '0987654321', NULL, '1999-01-01'),
  ('00000000002', '00000000002', 1, 3, 1, 'Colaborador', 'Usuário', 'usuario@ms.senac.br', '0147258369', NULL, '1990-01-01'),
  ('00000000003', '00000000003', 1, 4, 1, 'Aluno', 'Usuário', 'aluno@ms.senac.br', '2536985741', NULL, '1990-01-01');

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_area`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_area` (
  `ID` int(11)
  ,`Titulo` varchar(50)
  ,`Status` varchar(25)
  ,`Unidade` varchar(50)
  ,`Observação` text
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_categoria`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_categoria` (
  `ID` int(11)
  ,`Status` varchar(25)
  ,`Titulo` varchar(50)
  ,`Unidade` varchar(50)
  ,`Observações` text
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_estoque_atual`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_estoque_atual` (
  `Código` int(11)
  ,`Titulo` varchar(50)
  ,`Descrição` text
  ,`Saldo` int(11)
  ,`Data` date
  ,`Usuário` varchar(255)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_itens`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_itens` (
  `Código` int(11)
  ,`Título` varchar(50)
  ,`Descrição` text
  ,`Pontos` float
  ,`Área` varchar(50)
  ,`Categoria` varchar(50)
  ,`Subcategoria` varchar(50)
  ,`Unidade` varchar(50)
  ,`Status` varchar(25)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_kardex_posicao_atual_somada`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_kardex_posicao_atual_somada` (
  `Código` int(11)
  ,`Título` varchar(50)
  ,`Descrição` text
  ,`Saldo Atual` decimal(32,0)
  ,`Usuário` varchar(255)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_perfil`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_perfil` (
  `ID` int(11)
  ,`Perfil` varchar(20)
  ,`Administrador` tinyint(1)
  ,`Unidade` varchar(50)
  ,`Status` varchar(25)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_promocoes`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_promocoes` (
  `ID` int(11)
  ,`Título` varchar(50)
  ,`Descrição` varchar(50)
  ,`Pontos` float
  ,`Desconto` float
  ,`Quantidade` int(11)
  ,`Data Início` date
  ,`Data Final` date
  ,`Item Referência` varchar(50)
  ,`Usuário` varchar(255)
  ,`Unidade` varchar(50)
  ,`Status` varchar(25)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_qr_code`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_qr_code` (
  `ID` int(11)
  ,`Título` varchar(50)
  ,`Descrição` varchar(50)
  ,`Item Referência` varchar(50)
  ,`Pontos` float
  ,`Data Inicial` date
  ,`Data Final` date
  ,`Status` varchar(25)
  ,`Nome` varchar(255)
  ,`Unidade` varchar(50)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_subcategoria`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_subcategoria` (
  `ID` int(11)
  ,`Título` varchar(50)
  ,`Unidade` varchar(50)
  ,`Status` varchar(25)
  ,`Observação` text
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_unidades`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_unidades` (
  `ID` int(11)
  ,`Unidade` varchar(50)
  ,`Cidade` varchar(255)
  ,`UF` varchar(2)
  ,`Endereço` varchar(255)
  ,`Telefone` varchar(14)
  ,`Responsável` varchar(50)
  ,`Status` varchar(25)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura stand-in para vista `vw_usuarios`
  -- (Veja abaixo para a view atual)
  --
  CREATE TABLE `vw_usuarios` (
  `CPF` varchar(11)
  ,`Matrícula` varchar(20)
  ,`Nome` varchar(255)
  ,`Apelido` varchar(25)
  ,`E-mail` varchar(255)
  ,`Telefone` varchar(20)
  ,`Perfil` varchar(20)
  ,`Unidade` varchar(50)
  ,`Status` varchar(25)
  );

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_area`
  --
  DROP TABLE IF EXISTS `vw_area`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_area`  AS SELECT `a`.`id_area` AS `ID`, `a`.`ar_titulo` AS `Titulo`, `st`.`st_nome` AS `Status`, `uni`.`uni_descricao` AS `Unidade`, `a`.`ar_obs` AS `Observação` FROM ((`area` `a` join `status` `st` on(`st`.`id_status` = `a`.`fk_id_status`)) join `unidades` `uni` on(`uni`.`id_unidade` = `a`.`fk_id_unidade`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_categoria`
  --
  DROP TABLE IF EXISTS `vw_categoria`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_categoria`  AS SELECT `cat`.`id_categoria` AS `ID`, `st`.`st_nome` AS `Status`, `cat`.`cat_titulo` AS `Titulo`, `uni`.`uni_descricao` AS `Unidade`, `cat`.`cat_observacao` AS `Observações` FROM ((`categoria` `cat` join `unidades` `uni` on(`uni`.`id_unidade` = `cat`.`fk_id_unidade`)) join `status` `st` on(`st`.`id_status` = `cat`.`fk_id_status`)) ORDER BY `cat`.`cat_titulo` ASC  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_estoque_atual`
  --
  DROP TABLE IF EXISTS `vw_estoque_atual`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_estoque_atual`  AS SELECT `e`.`fk_id_item` AS `Código`, `i`.`it_titulo` AS `Titulo`, `i`.`it_descricao` AS `Descrição`, `e`.`it_qtde` AS `Saldo`, `e`.`est_dt_cad` AS `Data`, `u`.`usu_nome` AS `Usuário` FROM ((`estoque` `e` join `itens` `i` on(`i`.`id_item` = `e`.`fk_id_item`)) join `usuario` `u` on(`u`.`cpf` = `e`.`fk_cpf`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_itens`
  --
  DROP TABLE IF EXISTS `vw_itens`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_itens`  AS SELECT `i`.`id_item` AS `Código`, `i`.`it_titulo` AS `Título`, `i`.`it_descricao` AS `Descrição`, `i`.`it_pontos` AS `Pontos`, `a`.`ar_titulo` AS `Área`, `c`.`cat_titulo` AS `Categoria`, `sb`.`sc_titulo` AS `Subcategoria`, `u`.`uni_descricao` AS `Unidade`, `st`.`st_nome` AS `Status` FROM (((((`itens` `i` join `subcategoria` `sb` on(`sb`.`id_subcat` = `i`.`fk_id_subcat`)) join `categoria` `c` on(`c`.`id_categoria` = `i`.`fk_id_categoria`)) join `area` `a` on(`a`.`id_area` = `i`.`fk_id_area`)) join `unidades` `u` on(`u`.`id_unidade` = `i`.`fk_id_unidade`)) join `status` `st` on(`st`.`id_status` = `i`.`fk_id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_kardex_posicao_atual_somada`
  --
  DROP TABLE IF EXISTS `vw_kardex_posicao_atual_somada`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_kardex_posicao_atual_somada`  AS SELECT `it`.`id_item` AS `Código`, `it`.`it_titulo` AS `Título`, `it`.`it_descricao` AS `Descrição`, sum(`k`.`kar_qtde_item`) AS `Saldo Atual`, `u`.`usu_nome` AS `Usuário` FROM ((`kardex` `k` join `itens` `it` on(`it`.`id_item` = `k`.`fk_id_item`)) join `usuario` `u` on(`u`.`cpf` = `k`.`fk_cpf`)) GROUP BY `k`.`fk_id_item`  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_perfil`
  --
  DROP TABLE IF EXISTS `vw_perfil`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_perfil`  AS SELECT `p`.`id_perfil` AS `ID`, `p`.`nome_perfil` AS `Perfil`, `p`.`acesso_adm` AS `Administrador`, `u`.`uni_descricao` AS `Unidade`, `st`.`st_nome` AS `Status` FROM ((`perfil` `p` join `unidades` `u` on(`p`.`fk_id_unidade` = `u`.`id_unidade`)) join `status` `st` on(`p`.`fk_id_status` = `st`.`id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_promocoes`
  --
  DROP TABLE IF EXISTS `vw_promocoes`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_promocoes`  AS SELECT `p`.`id_promocao` AS `ID`, `p`.`prom_titulo` AS `Título`, `p`.`promo_descricao` AS `Descrição`, `p`.`prom_pontos` AS `Pontos`, `p`.`prom_desc` AS `Desconto`, `p`.`prom_quantidade` AS `Quantidade`, `p`.`prom_dt_inicio` AS `Data Início`, `p`.`promo_dt_fim` AS `Data Final`, `i`.`it_titulo` AS `Item Referência`, `u`.`usu_nome` AS `Usuário`, `uni`.`uni_descricao` AS `Unidade`, `st`.`st_nome` AS `Status` FROM ((((`promocoes` `p` join `itens` `i` on(`i`.`id_item` = `p`.`fk_id_item`)) join `usuario` `u` on(`u`.`cpf` = `p`.`fk_cpf`)) join `unidades` `uni` on(`uni`.`id_unidade` = `p`.`fk_id_unidade`)) join `status` `st` on(`st`.`id_status` = `p`.`fk_id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_qr_code`
  --
  DROP TABLE IF EXISTS `vw_qr_code`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_qr_code`  AS SELECT `qr`.`id_qrcode` AS `ID`, `qr`.`qr_titulo` AS `Título`, `qr`.`qr_descricao` AS `Descrição`, `i`.`it_titulo` AS `Item Referência`, `sen`.`sen_pontos` AS `Pontos`, `qr`.`qr_dt_inicio` AS `Data Inicial`, `qr`.`qr_dt_fim` AS `Data Final`, `st`.`st_nome` AS `Status`, `u`.`usu_nome` AS `Nome`, `uni`.`uni_descricao` AS `Unidade` FROM (((((`qr_code` `qr` join `senacoin` `sen` on(`sen`.`id_senacoin` = `qr`.`fk_id_senacoin`)) join `itens` `i` on(`i`.`id_item` = `qr`.`fk_id_item`)) join `usuario` `u` on(`u`.`cpf` = `qr`.`fk_cpf`)) join `unidades` `uni` on(`uni`.`id_unidade` = `qr`.`fk_id_unidade`)) join `status` `st` on(`st`.`id_status` = `qr`.`fk_id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_subcategoria`
  --
  DROP TABLE IF EXISTS `vw_subcategoria`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_subcategoria`  AS SELECT `sc`.`id_subcat` AS `ID`, `sc`.`sc_titulo` AS `Título`, `u`.`uni_descricao` AS `Unidade`, `st`.`st_nome` AS `Status`, `sc`.`sc_observacao` AS `Observação` FROM ((`subcategoria` `sc` join `unidades` `u` on(`sc`.`fk_id_unidade` = `u`.`id_unidade`)) join `status` `st` on(`sc`.`fk_id_status` = `st`.`id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_unidades`
  --
  DROP TABLE IF EXISTS `vw_unidades`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_unidades`  AS SELECT `u`.`id_unidade` AS `ID`, `u`.`uni_descricao` AS `Unidade`, `u`.`uni_cidade` AS `Cidade`, `u`.`uni_uf` AS `UF`, `u`.`uni_endereco` AS `Endereço`, `u`.`uni_telefone` AS `Telefone`, `u`.`uni_resposavel` AS `Responsável`, `st`.`st_nome` AS `Status` FROM (`unidades` `u` join `status` `st` on(`u`.`fk_id_status` = `st`.`id_status`))  ;

  -- --------------------------------------------------------

  --
  -- Estrutura para vista `vw_usuarios`
  --
  DROP TABLE IF EXISTS `vw_usuarios`;

  CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_usuarios`  AS SELECT `usu`.`cpf` AS `CPF`, `usu`.`usu_matricula` AS `Matrícula`, `usu`.`usu_nome` AS `Nome`, `usu`.`usu_apelido` AS `Apelido`, `usu`.`usu_email` AS `E-mail`, `usu`.`usu_telefone` AS `Telefone`, `p`.`nome_perfil` AS `Perfil`, `u`.`uni_descricao` AS `Unidade`, `st`.`st_nome` AS `Status` FROM (((`usuario` `usu` join `perfil` `p` on(`p`.`id_perfil` = `usu`.`fk_id_perfil`)) join `unidades` `u` on(`u`.`id_unidade` = `usu`.`fk_id_unidade`)) join `status` `st` on(`st`.`id_status` = `usu`.`fk_id_status`))  ;

  --
  -- Índices para tabelas despejadas
  --

  --
  -- Índices para tabela `area`
  --
  ALTER TABLE `area`
    ADD PRIMARY KEY (`id_area`),
    ADD UNIQUE KEY `UQ_titulo_area` (`ar_titulo`),
    ADD KEY `fk_id_status_area` (`fk_id_status`),
    ADD KEY `fk_id_unidade_area` (`fk_id_unidade`);

  --
  -- Índices para tabela `carteira_digital`
  --
  ALTER TABLE `carteira_digital`
    ADD PRIMARY KEY (`id_carteira`),
    ADD KEY `fk_id_transacao_cd` (`fk_id_transacao`);

  --
  -- Índices para tabela `categoria`
  --
  ALTER TABLE `categoria`
    ADD PRIMARY KEY (`id_categoria`),
    ADD UNIQUE KEY `UQ_titulo_cat` (`cat_titulo`),
    ADD KEY `fk_id_status_cat` (`fk_id_status`),
    ADD KEY `fk_id_unidade_cat` (`fk_id_unidade`);

  --
  -- Índices para tabela `estoque`
  --
  ALTER TABLE `estoque`
    ADD PRIMARY KEY (`fk_id_item`),
    ADD KEY `fk_cpf_estoque` (`fk_cpf`);

  --
  -- Índices para tabela `extrato`
  --
  ALTER TABLE `extrato`
    ADD KEY `fk_id_transacao_ext` (`fk_id_transacao`);

  --
  -- Índices para tabela `itens`
  --
  ALTER TABLE `itens`
    ADD PRIMARY KEY (`id_item`),
    ADD KEY `fk_id_area_item` (`fk_id_area`),
    ADD KEY `fk_id_categoria_item` (`fk_id_categoria`),
    ADD KEY `fk_id_status_item` (`fk_id_status`),
    ADD KEY `fk_id_subcat_item` (`fk_id_subcat`),
    ADD KEY `fk_id_unidade_item` (`fk_id_unidade`);

  --
  -- Índices para tabela `kardex`
  --
  ALTER TABLE `kardex`
    ADD PRIMARY KEY (`id_kardex`),
    ADD KEY `fk_id_item_kardex` (`fk_id_item`),
    ADD KEY `fk_cpf_kardex` (`fk_cpf`);

  --
  -- Índices para tabela `perfil`
  --
  ALTER TABLE `perfil`
    ADD PRIMARY KEY (`id_perfil`),
    ADD UNIQUE KEY `UQ_nome_perfil` (`nome_perfil`),
    ADD KEY `fk_id_status_perfil` (`fk_id_status`) USING BTREE,
    ADD KEY `fk_id_unidade_perfil` (`fk_id_unidade`) USING BTREE;

  --
  -- Índices para tabela `promocoes`
  --
  ALTER TABLE `promocoes`
    ADD PRIMARY KEY (`id_promocao`),
    ADD KEY `fk_id_status_promocao` (`fk_id_status`),
    ADD KEY `fk_id_item_promocao` (`fk_id_item`),
    ADD KEY `k_id_unidade_promocao` (`fk_id_unidade`),
    ADD KEY `fk_id_cpf_promocao` (`fk_cpf`);

  --
  -- Índices para tabela `qr_code`
  --
  ALTER TABLE `qr_code`
    ADD PRIMARY KEY (`id_qrcode`),
    ADD KEY `fk_id_status_qrcode` (`fk_id_status`),
    ADD KEY `fk_id_unidade_qrcode` (`fk_id_unidade`),
    ADD KEY `fk_id_item_qrcode` (`fk_id_item`),
    ADD KEY `fk_cpf_qrcode` (`fk_cpf`),
    ADD KEY `fk_id_senacoin_qrcode` (`fk_id_senacoin`);

  --
  -- Índices para tabela `senacoin`
  --
  ALTER TABLE `senacoin`
    ADD PRIMARY KEY (`id_senacoin`);

  --
  -- Índices para tabela `status`
  --
  ALTER TABLE `status`
    ADD PRIMARY KEY (`id_status`),
    ADD UNIQUE KEY `UQ_nome_status` (`st_nome`);

  --
  -- Índices para tabela `subcategoria`
  --
  ALTER TABLE `subcategoria`
    ADD PRIMARY KEY (`id_subcat`),
    ADD UNIQUE KEY `UQ_titulo_subcat` (`sc_titulo`),
    ADD KEY `fk_id_status_sc` (`fk_id_status`),
    ADD KEY `fk_id_unidade_sc` (`fk_id_unidade`);

  --
  -- Índices para tabela `transacao`
  --
  ALTER TABLE `transacao`
    ADD PRIMARY KEY (`id_transacao`),
    ADD KEY `fk_cpf_transacao` (`fk_cpf`),
    ADD KEY `fk_id_senacoin_transacao` (`fk_id_senacoin`),
    ADD KEY `fk_id_item_transacao` (`fk_id_item`),
    ADD KEY `fk_id_promocao_transacao` (`fk_id_promocao`);

  --
  -- Índices para tabela `unidades`
  --
  ALTER TABLE `unidades`
    ADD PRIMARY KEY (`id_unidade`),
    ADD KEY `fk_id_status_unidades` (`fk_id_status`) USING BTREE;

  --
  -- Índices para tabela `usuario`
  --
  ALTER TABLE `usuario`
    ADD PRIMARY KEY (`cpf`),
    ADD UNIQUE KEY `UQ_matricula_usuario` (`usu_matricula`),
    ADD KEY `fk_id_status_usuario` (`fk_id_status`),
    ADD KEY `fk_id_unidade_usuario` (`fk_id_unidade`),
    ADD KEY `fk_id_perfil_usuario` (`fk_id_perfil`);

  --
  -- AUTO_INCREMENT de tabelas despejadas
  --

  --
  -- AUTO_INCREMENT de tabela `area`
  --
  ALTER TABLE `area`
    MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

  --
  -- AUTO_INCREMENT de tabela `carteira_digital`
  --
  ALTER TABLE `carteira_digital`
    MODIFY `id_carteira` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT de tabela `categoria`
  --
  ALTER TABLE `categoria`
    MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

  --
  -- AUTO_INCREMENT de tabela `estoque`
  --
  ALTER TABLE `estoque`
    MODIFY `fk_id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT de tabela `itens`
  --
  ALTER TABLE `itens`
    MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT de tabela `kardex`
  --
  ALTER TABLE `kardex`
    MODIFY `id_kardex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

  --
  -- AUTO_INCREMENT de tabela `perfil`
  --
  ALTER TABLE `perfil`
    MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
  -- AUTO_INCREMENT de tabela `promocoes`
  --
  ALTER TABLE `promocoes`
    MODIFY `id_promocao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

  --
  -- AUTO_INCREMENT de tabela `qr_code`
  --
  ALTER TABLE `qr_code`
    MODIFY `id_qrcode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

  --
  -- AUTO_INCREMENT de tabela `senacoin`
  --
  ALTER TABLE `senacoin`
    MODIFY `id_senacoin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
  -- AUTO_INCREMENT de tabela `status`
  --
  ALTER TABLE `status`
    MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
  -- AUTO_INCREMENT de tabela `subcategoria`
  --
  ALTER TABLE `subcategoria`
    MODIFY `id_subcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT de tabela `transacao`
  --
  ALTER TABLE `transacao`
    MODIFY `id_transacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
  -- AUTO_INCREMENT de tabela `unidades`
  --
  ALTER TABLE `unidades`
    MODIFY `id_unidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- Restrições para despejos de tabelas
  --

  --
  -- Limitadores para a tabela `area`
  --
  ALTER TABLE `area`
    ADD CONSTRAINT `fk_id_status_area` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_area` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `carteira_digital`
  --
  ALTER TABLE `carteira_digital`
    ADD CONSTRAINT `fk_id_transacao_cd` FOREIGN KEY (`fk_id_transacao`) REFERENCES `transacao` (`id_transacao`);

  --
  -- Limitadores para a tabela `categoria`
  --
  ALTER TABLE `categoria`
    ADD CONSTRAINT `fk_id_status_cat` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_cat` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `estoque`
  --
  ALTER TABLE `estoque`
    ADD CONSTRAINT `fk_cpf_estoque` FOREIGN KEY (`fk_cpf`) REFERENCES `usuario` (`cpf`),
    ADD CONSTRAINT `fk_id_item_estoque` FOREIGN KEY (`fk_id_item`) REFERENCES `itens` (`id_item`);

  --
  -- Limitadores para a tabela `extrato`
  --
  ALTER TABLE `extrato`
    ADD CONSTRAINT `fk_id_transacao_ext` FOREIGN KEY (`fk_id_transacao`) REFERENCES `transacao` (`id_transacao`);

  --
  -- Limitadores para a tabela `itens`
  --
  ALTER TABLE `itens`
    ADD CONSTRAINT `fk_id_area_item` FOREIGN KEY (`fk_id_area`) REFERENCES `area` (`id_area`),
    ADD CONSTRAINT `fk_id_categoria_item` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categoria` (`id_categoria`),
    ADD CONSTRAINT `fk_id_status_item` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_subcat_item` FOREIGN KEY (`fk_id_subcat`) REFERENCES `subcategoria` (`id_subcat`),
    ADD CONSTRAINT `fk_id_unidade_item` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `kardex`
  --
  ALTER TABLE `kardex`
    ADD CONSTRAINT `fk_cpf_kardex` FOREIGN KEY (`fk_cpf`) REFERENCES `usuario` (`cpf`),
    ADD CONSTRAINT `fk_id_item_kardex` FOREIGN KEY (`fk_id_item`) REFERENCES `itens` (`id_item`);

  --
  -- Limitadores para a tabela `perfil`
  --
  ALTER TABLE `perfil`
    ADD CONSTRAINT `fk_id_perfil` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_perfil` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `promocoes`
  --
  ALTER TABLE `promocoes`
    ADD CONSTRAINT `fk_id_cpf_promocao` FOREIGN KEY (`fk_cpf`) REFERENCES `usuario` (`cpf`),
    ADD CONSTRAINT `fk_id_item_promocao` FOREIGN KEY (`fk_id_item`) REFERENCES `itens` (`id_item`),
    ADD CONSTRAINT `fk_id_status_promocao` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `k_id_unidade_promocao` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `qr_code`
  --
  ALTER TABLE `qr_code`
    ADD CONSTRAINT `fk_cpf_qrcode` FOREIGN KEY (`fk_cpf`) REFERENCES `usuario` (`cpf`),
    ADD CONSTRAINT `fk_id_item_qrcode` FOREIGN KEY (`fk_id_item`) REFERENCES `itens` (`id_item`),
    ADD CONSTRAINT `fk_id_senacoin_qrcode` FOREIGN KEY (`fk_id_senacoin`) REFERENCES `senacoin` (`id_senacoin`),
    ADD CONSTRAINT `fk_id_status_qrcode` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_qrcode` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `subcategoria`
  --
  ALTER TABLE `subcategoria`
    ADD CONSTRAINT `fk_id_status_sc` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_sc` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);

  --
  -- Limitadores para a tabela `transacao`
  --
  ALTER TABLE `transacao`
    ADD CONSTRAINT `fk_cpf_transacao` FOREIGN KEY (`fk_cpf`) REFERENCES `usuario` (`cpf`),
    ADD CONSTRAINT `fk_id_item_transacao` FOREIGN KEY (`fk_id_item`) REFERENCES `itens` (`id_item`),
    ADD CONSTRAINT `fk_id_promocao_transacao` FOREIGN KEY (`fk_id_promocao`) REFERENCES `promocoes` (`id_promocao`),
    ADD CONSTRAINT `fk_id_senacoin_transacao` FOREIGN KEY (`fk_id_senacoin`) REFERENCES `senacoin` (`id_senacoin`);

  --
  -- Limitadores para a tabela `unidades`
  --
  ALTER TABLE `unidades`
    ADD CONSTRAINT `fk_id_status` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`);

  --
  -- Limitadores para a tabela `usuario`
  --
  ALTER TABLE `usuario`
    ADD CONSTRAINT `fk_id_perfil_usuario` FOREIGN KEY (`fk_id_perfil`) REFERENCES `perfil` (`id_perfil`),
    ADD CONSTRAINT `fk_id_status_usuario` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
    ADD CONSTRAINT `fk_id_unidade_usuario` FOREIGN KEY (`fk_id_unidade`) REFERENCES `unidades` (`id_unidade`);
  --
  -- Banco de dados: `tela_login56`
  --
  CREATE DATABASE IF NOT EXISTS `tela_login56` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  USE `tela_login56`;

  -- --------------------------------------------------------

  --
  -- Estrutura da tabela `usuarios`
  --

  CREATE TABLE `usuarios` (
    `nome` varchar(50) NOT NULL,
    `telefone` varchar(25) NOT NULL,
    `email` varchar(100) NOT NULL,
    `senha` varchar(250) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  --
  -- Extraindo dados da tabela `usuarios`
  --

  INSERT INTO `usuarios` (`nome`, `telefone`, `email`, `senha`) VALUES
  ('Gaikko Alves da Silva Pinto', '7981148042', 'gaikko@gmail.com', 'e10adc3949ba59abbe56e057f20f883e'),
  ('Gaikko Alves da Silva Pinto', '7981148042', 'gaikko@gmail.com', '123456');


  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
