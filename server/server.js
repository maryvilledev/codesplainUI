import express from 'express'
import Redis from 'ioredis'

app = express()
redis = Redis(6379, process.env.REDIS_URL || "localhost")
