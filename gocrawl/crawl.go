package main

import (
	"fmt"
	"path/filepath"
	"os"
	"log"
)

func main(){
	for _,a := range os.Args[1:] {
		err := filepath.Walk(a,
			func(path string, info os.FileInfo, err error) error {
				if err != nil {return err}
				if !info.IsDir() {fmt.Println(path)}
				// https://yourbasic.org/golang/list-files-in-directory/
				//if !info.IsDir() {fmt.Println(path, info.Size())}
				return nil
			}
		)
		if err != nil {log.Println(err)}
	}
}
