package sn.galsencodeurs.sample.blockchain.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import sn.galsencodeurs.sample.blockchain.model.Block;

@Service
@Slf4j
public class BlockChain {

    private final Block genesisBlock;

    @Getter
    private List<Block> blocks;

    public BlockChain() {
        blocks = new LinkedList<>();
        this.createGenesisBlock();
        genesisBlock = this.blocks.get(0);
    }

    public void generateNextBlock(String blockData) {
        final Block previousBlock = this.getLatestBlock();

        long nextIndex = previousBlock.getIndex() + 1;
        Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
        blocks.add(new Block(nextIndex, timestamp, blockData, previousBlock.getHash()));
    }

    public boolean isValidChain() {
        if (!this.isValidGenesisBlock()) {
            return false;
        }


        for (int i = 1; i < this.blocks.size(); i++) {
            if (!this.isValidNewBlock(this.blocks.get(i), this.blocks.get(i - 1))) {
                return false;
            }
        }
        return true;
    }


    private void createGenesisBlock() {
        Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
        this.blocks.add(new Block(0L, timestamp, "Genesis Block", null));
    }

    private Block getLatestBlock() {
        return this.blocks.get(this.blocks.size() - 1);
    }

    private boolean isValidNewBlock(Block newBlock, Block previousBlock) {
        if (previousBlock.getIndex() + 1 != newBlock.getIndex()) {
            return false;
        }
        if (!previousBlock.getHash().equals(newBlock.getPreviousHash())) {
            log.error("Invalid previous hash for block {}", newBlock);
            return false;
        }
        final String hash = newBlock.calculateHash();
        if (!hash.equals(newBlock.getHash())) {
            log.error("Invalid hash: {} != {}" + hash, newBlock.getHash());
            return false;
        }
        return true;
    }

    private boolean isValidGenesisBlock() {
        if (this.genesisBlock.getIndex() != 0) {
            log.error("Invalid genesis index {}", genesisBlock.getIndex());
            return false;
        }
        if (Objects.nonNull(genesisBlock.getPreviousHash())) {
            log.error("Invalid previous hash {}", genesisBlock.getPreviousHash());
            return false;
        }
        final String hash = genesisBlock.calculateHash();
        if (!hash.equals(genesisBlock.getHash())) {
            log.error("Invalid hash {} != {}", hash, genesisBlock.getHash());

        }

        return true;
    }
}
