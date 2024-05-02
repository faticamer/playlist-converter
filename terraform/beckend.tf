terraform {
  backend "s3" {
    bucket         = "ba-playlist-converter-backend"
    encrypt        = true
    key            = "terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "ba-playlist-converter-backend"
  }
}