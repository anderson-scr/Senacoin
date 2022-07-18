 ###########Clientes##############
 import os
from socket import if_indextoname


if
        if op=="1": 
            while True:
                print (bold_color.red+'Menu Cliente \n')
                print (bold_color.red+'1 - Incluir Cliente')
                print (bold_color.red+'2 - Alterar Cliente')
                print (bold_color.red+'3 - Relatório de Clientes')
                print (bold_color.red+'0 - Sair')

                try : #achei um erro

                    opCli=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opCli==1:                                           
                        print(bold_color.yellow+"=====Cadastro de Cliente=====")
                        nomeCliente=str(input("Digite o nome do Cliente = "))
                        foneCliente=str(input("Digite o Telefone do Cliente = "))
                        cpfCliente=str(input("Digite o CPF do nome do Cliente = "))
                        rgCliente=str(input("Digite o RG do nome do Cliente = "))
                        enderecoCliente=str(input("Digite o Endereço do Cliente = "))
                        veiculoCliente=str(input("Digite o Veículo do Cliente = "))
                        placaCliente=str(input("Digite a placa do Veículo do Cliente = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("cls")

                    elif opCli==2:
                        print(bold_color.yellow+"=====Alteração do Cadastro de Cliente=====")
                        nomeCliente=str(input("Digite o nome do Cliente = "))
                        foneCliente=str(input("Digite o Telefone do Cliente = "))
                        cpfCliente=str(input("Digite o CPF do nome do Cliente = "))
                        rgCliente=str(input("Digite o RG do nome do Cliente = "))
                        enderecoCliente=str(input("Digite o Endereço do Cliente = "))
                        veiculoCliente=str(input("Digite o Veículo do Cliente = "))
                        placaCliente=str(input("Digite a placa do Veículo do Cliente = "))
                        print(bold_color.red+"Cadastro Alterado com Sucesso")                        
                        os.system("pause")
                        os.system("cls")
                    
                    elif op==3:                        
                        if nomeCliente!='':
                            print(bold_color.yellow+"=====Relatório do Cadastro de Cliente=====")
                            print(bold_color.bold + "Nome do Cliente = " + bold_color.bold + nomeCliente)
                            print(bold_color.bold + "Fone do Cliente = " + bold_color.bold + foneCliente)
                            print(bold_color.bold + "CPF do Cliente = " + bold_color.bold + cpfCliente)
                            print(bold_color.bold + "RG do Cliente = " + bold_color.bold + rgCliente)
                            print(bold_color.bold + "Endereço do Cliente = " + bold_color.bold + enderecoCliente)
                            print(bold_color.bold + "Veículo do Cliente = " + bold_color.bold + veiculoCliente)
                            print(bold_color.bold + "Placa do Cliente = " + bold_color.bold + placaCliente)
                            os.system("pause")
                            os.system("cls")
                         
                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")
                        
                    elif opCli==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        Break 
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")
                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")


        
        ###########Estoque##############
        
        
        if op==2:
            while True:
                print (bold_color.red+'Menu Estoque')
                print (bold_color.red+'1 - Incluir Produto')
                print (bold_color.red+'2 - Alterar Produto')
                primt (bold_color.red+'3 - Relatório de Produtos') 
                print (bold_color.red+'0 - Sair')
                
                try:
                    opEst=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opEst==1:
                        print(bold_color.yellow+"=====Cadastro de Estoque=====")
                        descProduto=str(input("Digite a Descrição do Produto = "))
                        qtdeProduto=str(input("Digite a Quantidade de Produtos = "))
                        codProduto=str(input("Digite o Código do Produto = "))
                        valorProduto=str(input("Digite o Valor do Produto = "))
                        catProduto=str(input("Digite a Categoria do Produto = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opEst==2:
                        print(bold_color.yellow+"=====Alteração do Cadastro de Produtos=====")
                        descProduto=str(input("Digite a Descrição do Produto = "))
                        qtdeProduto=str(input("Digite a Quantidade de Produtos = "))
                        codProduto=str(input("Digite o Código do Produto = "))
                        valorProduto=str(input("Digite o Valor do Produto = "))
                        catProduto=str(input("Digite a Categoria do Produto = "))
                        print(bold_color.red+"Cadastro Alterado com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opEst==3: #achei um erro
                        if descProduto!="":
                            print(bold_color.yellow+"=====Relatório do Cadastro de Cliente=====")
                            print(bold_color.bold + "Dscrição do Produto = " + bold_color.bold + descProduto)
                            print(bold_color.bold + "Quantidade do Produto = " + bold_color.bold + qtdeProduto)
                            print(bold_color.bold + "Código do Produto = " + bold_color.bold + codProduto)
                            print(bold_color.bold + "Valor do Produto = " + bold_color.bold + valorProduto)
                            print(bold_color.bold + "Categoria do Produto = " + bold_color.bold + catProduto)
                            os.system("pause")
                            os.system("cls")

                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")

                        
                    elif opEst==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")
                
                except: 
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")


                     ###########Vendas##############
        
        
        if op==3:#achei um erro 
            while True:
                print (bold_color.red+'Menu Vendas')
                print (bold_color.red+'1 - Incluir Venda')
                print (bold_color.red+'2 - Alterar venda')
                print (bold_color.red+'3 - Relatório de Vendas')
                print (bold_color.red+'0 - Sair')
                
                try:
                    opVen=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opVen==1:
                        print(bold_color.yellow+"=====Cadastro de Venda=====")
                        vendaProduto=str(input("Digite a Descrição do Produto = "))
                        vendaQtde=str(input("Digite a Quantidade de Produtos = "))
                        vendaCod=str(input("Digite o Código do Produto = "))
                        vendaValor=str(input("Digite o Valor do Produto = "))
                        cpfVenda=str(input("Digite o CPF do Cliente = "))
                        print(bold_color.red+"Venda Efetuada com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opVen==2:
                        print(bold_color.yellow+"=====Alteração de Venda=====")
                        vendaProduto=str(input("Digite a Descrição do Produto = "))
                        vendaQtde=str(input("Digite a Quantidade de Produtos = "))
                        vendaCod=str(input("Digite o Código do Produto = "))
                        vendaValor=str(input("Digite o Valor do Produto = "))
                        cpfVenda=str(input("Digite o CPF do Cliente = "))
                        print(bold_color.red+"Venda Alterada com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opVen==3:
                        if nomeCliente!="":
                            print(bold_color.yellow+"=====Relatório de Vendas=====")
                            print(bold_color.bold + "Dscrição do Produto = " + bold_color.bold + vendaProduto)
                            print(bold_color.bold + "Quantidade do Produto = " + bold_color.bold + vendaQtde)
                            print(bold_color.bold + "Código do Produto = " + bold_color.bold + vendaCod)
                            print(bold_color.bold + "Valor do Produto = " + bold_color.bold + vendaValor)
                            print(bold_color.bold + "Categoria do Produto = " + bold_color.bold + cpfVenda)
                            os.system("pause")
                            os.system("cls")

                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")
                    
                    
                    elif opVen==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")

                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")


###########Colaboradores##############
        if op==4:
            while True:
                print (bold_color.red+'Menu Cloaboradores \n')
                print (bold_color.red+'1 - Incluir Colaborador')
                print (bold_color.red+'2 - Alterar Colaborador')
                print (bold_color.red+'3 - Relatório de Colaboradores')
                print (bold_color.red+'0 - Sair')
                
     try:
                    opColab=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opColab==1:
                        print(bold_color.yellow+"=====Cadastro de Colaboradores=====")
                        nomeColab=str(input("Digite o nome do Colaborador = "))
                        foneColab=str(input("Digite o Telefone do Colaborador = "))
                        cpfColab=str(input("Digite o CPF do nome do Colaborador = "))
                        rgColab=str(input("Digite o RG do nome do Colaborador = "))
                        enderecoColab=str(input("Digite o Endereço do Colaborador = "))
                        salColab=str(input("Digite o Salário do Colaborador = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("xls") 

                    elif opColab==2:
                        print(bold_color.yellow+"=====Alteração de Colaboradores=====")
                        nomeColab=str(input("Digite o nome do Colaborador = "))
                        foneColab=str(input("Digite o Telefone do Colaborador = "))
                        cpfColab=str(input("Digite o CPF do nome do Colaborador = "))
                        rgColab=str(input("Digite o RG do nome do Colaborador = "))
                        enderecoColab=str(input("Digite o Endereço do Colaborador = "))
                        salColab=str(input("Digite o Salário do Colaborador = "))
                        print(bold_color.red+"Cadastro Alterado com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opColab==3:
                if nomeCliente!="":
                            print(bold_color.yellow+"=====Relatório do Cadastro de Cliente=====")
                            print(bold_color.bold + "Nome do Colaborador = " + bold_color.bold + nomeColab)
                            print(bold_color.bold + "Fone do Colaborador = " + bold_color.bold + foneColab)
                            print(bold_color.bold + "CPF do Colaborador = " + bold_color.bold + cpfColab)
                            print(bold_color.bold + "RG do Colaborador = " + bold_color.bold + rgColab)
                            print(bold_color.bold + "Endereço do Colaborador = " + bold_color.bold + endereçoColab) 
                            print(bold_color.bold + "Salário do Colaborador = " + bold_color.bold + salColab)
                            os.system("pause")
                            os.system("cls")
                        
                else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")



                elif opColab==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")
                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")


                    ##################Ordem de Serviço##############
        if op==5:
            while True: #achei um erro
               print (bold_color.red+'Menu Ordem de Serviço \n')
               print (bold_color.red+'1 - Incluir OS')
               print (bold_color.red+'2 - Alterar OS')
               print (bold_color.red+'3 - Relatório de OS')
               print (bold_color.red+'0 - Sair')
               
               try:#achei um erro
                    opOs=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opOs==1:
                        print(bold_color.yellow+"=====Cadastro de Ordem de Serviço=====")
                        nomeServ=str(input("Digite o nome do Cliente = "))
                        tipoServ=str(input("Digite o Tipo de Serviço = "))
                        valorServ=str(input("Digite o Valor do Serviço = "))
                        pecaServ=str(input("Digite a Peça = "))
                        valorPserv=str(input("Digite o Valor da Peça = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opColab==2:
                        print(bold_color.yellow+"=====Alteração de Ordem de Serviço=====")
                        nomeServ=str(input("Digite o nome do Cliente = "))
                        tipoServ=str(input("Digite o Tipo de Serviço = "))
                        valorServ=str(input("Digite o Valor do Serviço = "))
                        pecaServ=str(input("Digite a Peça = "))
                        valorPserv=str(input("Digite o Valor da Peça = "))
                        print(bold_color.red+"Cadastro Alterado com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opColab==3:
                        if nomeServ!="":
                            print(bold_color.yellow+"=====Relatório do Cadastro de Cliente=====")
                            print(bold_color.bold + "Nome do Cliente = " + bold_color.bold + nomeServ)
                            print(bold_color.bold + "Tipo de Serviço = " + bold_color.bold + tipoServ)
                            print(bold_color.bold + "Valor do Serviço = " + bold_color.bold + valorServ)
                            print(bold_color.bold + "Peça = " + bold_color.bold + pecaServ)
                            print(bold_color.bold + "Valor da Peça = " + bold_color.bold + valorPserv)
                            os.system("pause")
                            os.system("cls")
                        
                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")



                    elif opColab==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")
                
               except: #achei um erro
                     os.system("cls")
                     print("Digite um valor válido")
                     os.system("pause")

                     os.system("cls")

                    #############################Ordem de Serviço##############
        if op==6:
            while True:
                print (bold_color.red+'Menu Retorno de Serviço \n')
                print (bold_color.red+'1 - Incluir OS')
                print (bold_color.red+'2 - Alterar OS')
                print (bold_color.red+'3 - Relatório de OS')
                print (bold_color.red+'0 - Sair')
                
                try:
                    opOs=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opOs==1:
                        print(bold_color.yellow+"=====Cadastro de Retorno de Serviço=====")
                        nomeServRet=str(input("Digite o nome do Cliente = "))
                        numServRet=str(input("Digite o Número da Ordem de Serviço Antiga = "))
                        defeitoServRet=str(input("Digite o Defeito reclamado = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opColab==2:
                        print(bold_color.yellow+"=====Alteração Retorno de Ordem de Serviço=====")
                        nomeServRet=str(input("Digite o nome do Cliente = "))
                        numServRet=str(input("Digite o Número da Ordem de Serviço Antiga = "))
                        defeitoServRet=str(input("Digite o Defeito reclamado = "))
                        print(bold_color.red+"Cadastro Alterado com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opColab==3:
                        if nomeServ!="":
                            print(bold_color.yellow+"=====Relatório do Alteração de Ordem de Serviço=====")
                            print(bold_color.bold + "Nome do Cliente = " + bold_color.bold + nomeServRet)
                            print(bold_color.bold + "Número da Ordem de Serviço Antiga = " + bold_color.bold + numServRet)
                            print(bold_color.bold + "Defeito Reclamado = " + bold_color.bold + defeitoServRet)
                            os.system("pause")
                            os.system("cls")
                        
                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")



                    elif opColab==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")
                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")

                    #####################Notas Fiscais#############                         
        
        if op==7:
            while True:
                print (bold_color.red+'Menu Notas Fiscais')
                print (bold_color.red+'1 - Incluir NF')
                print (bold_color.red+'2 - Alterar NF')
                print (bold_color.red+'3 - Relatório de NFs')
                print (bold_color.red+'0 - Sair')
                
                try:
                    opVen=int(input(bold_color.green+'Selecione a Opção = '))
                    os.system("cls")
                    if opVen==1:
                        print(bold_color.yellow+"=====Cadastro de NF=====")
                        nfProduto=str(input("Digite a Descrição do Produto = "))
                        nfQtde=str(input("Digite a Quantidade de Produtos = "))
                        nfCod=str(input("Digite o Código do Produto = "))
                        nfValor=str(input("Digite o Valor do Produto = "))
                        nfCpf=str(input("Digite o CPF do Cliente = "))
                        print(bold_color.red+"Venda Efetuada com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opVen==2:
                        print(bold_color.yellow+"=====Alteração de Venda=====")
                        nfProduto=str(input("Digite a Descrição do Produto = "))
                        nfQtde=str(input("Digite a Quantidade de Produtos = "))
                        nfCod=str(input("Digite o Código do Produto = "))
                        nfValor=str(input("Digite o Valor do Produto = "))
                        nfCpf=str(input("Digite o CPF do Cliente = "))
                        print(bold_color.red+"Venda Alterada com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opVen==3:
                        if nomeCliente!="":
                            print(bold_color.yellow+"=====Relatório de Vendas=====")
                            print(bold_color.bold + "Dscrição do Produto = " + bold_color.bold + nfProduto)
                            print(bold_color.bold + "Quantidade do Produto = " + bold_color.bold + nfQtde)
                            print(bold_color.bold + "Código do Produto = " + bold_color.bold + nfCod)
                            print(bold_color.bold + "Valor do Produto = " + bold_color.bold + nfValor)
                            print(bold_color.bold + "CPF do Cliente = " + bold_color.bold + nfCpf)
                            os.system("pause")
                            os.system("cls")

                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")
                    
                    
                    elif opVen==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")

                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")


################ ##################### Livro Caixa ##############
        
        
        if op==7:  
            while True:
                print (bold_color.red+'Menu Livro Caixa')
                print (bold_color.red+'1 - Incluir')
                print (bold_color.red+'2 - Alterar')
                print (bold_color.red+'3 - Relatório do Livro Caixa')
                print (bold_color.red+'0 - Sair')
                
                try:
                    opVen=int(imput("bold_color.green+'Selecione a Opção = ")) 
                    os.system("cls")
                    if opVen==1:
                        print(bold_color.yellow+"=====Incluir Valor=====")
                        livroDesc=str(input("Digite a Descrição da entrada ou saída= "))
                        valorDesc=str(input("Digite a o Valor = "))
                        tipoDesc=str(input("Digite o tipo E/S = "))
                        print(bold_color.red+"Cadastro Efetuado com Sucesso")
                        os.system("pause")
                        os.system("cls")


                    elif opVen==2:
                        print(bold_color.yellow+"=====Alteração de Livro Caixa=====")
                        livroDesc=str(input("Digite a Descrição da entrada ou saída= "))
                        valorDesc=str(input("Digite a o Valor = "))
                        tipoDesc=str(input("Digite o tipo E/S = ")) 
                        print(bold_color.red+"Livro Caixa Alterado com Sucesso")
                        os.system("pause")
                        os.system("cls")
                    
                    elif opVen==3:
                        if nomeCliente!="":
                            print(bold_color.yellow+"=====Relatório do Livro Caixa=====")
                            print(bold_color.bold + "Dscrição do Livro Caixa = " + bold_color.bold + livroDesc)
                            print(bold_color.bold + "Valor Lançado = " + bold_color.bold + valorDesc)
                            print(bold_color.bold + "Tipo de lançamento E/S = " + bold_color.bold + tipoDesc)
                            os.system("pause")
                            os.system("cls")

                        else:
                            print(bold_color.yellow+"Nenhum Registro Localizado")
                    
                    
                    elif opVen==0:
                        os.system("cls")
                        print("Voltar - Menu Principal")
                        os.system("pause")
                        os.system("cls")
                        break
                        

                    else: 
                        os.system("cls")
                        print("Digite um valor válido")
                        os.system("pause")
                        os.system("cls")

                
                except:
                    os.system("cls")
                    print("Digite um valor válido")
                    os.system("pause")
                    os.system("cls")

######################



                
        elif op==0:
            os.system("pause")
            os.system("cls")
            break
        
        else:
            os.system("cls")
            print("Digite um valor válido")
            os.system("pause")
            os.system("cls")


    except:
        os.system("cls")
        print("Digite um valor válido")
        os.system("pause")
        os.system("cls")

