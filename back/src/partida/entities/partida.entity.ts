import { Torneio } from "src/torneio/entities/torneio.entity";
import { PrimaryGeneratedColumn, Column, Entity, TableInheritance, ManyToOne, JoinColumn, JoinTable } from "typeorm";

@Entity()
@TableInheritance({column: {type: "varchar", name: "tipo"}})
export class Partida{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @Column()
    hora: string;

    @ManyToOne(() => Torneio, (torneio) => torneio.partidas, {
        onDelete: "CASCADE"
    })
    torneio: Torneio;
}