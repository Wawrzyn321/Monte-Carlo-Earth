package main

import (
	"github.com/Wawrzyn321/Monte-Carlo-Earth/golang/mce"
	"log"
	"os"
)

func main() {
	backend, err := mce.NewMonteCarloEarth()
	if err != nil {
		log.Fatalf("Cannot create MonteCarloEarth: %e", err)
	}
	os.Exit(backend.Run())
}
