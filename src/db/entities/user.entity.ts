import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'teste_tabela_puf'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    id_cliente: string;

    @Column({type: 'boolean'})
    ativo: boolean;
}