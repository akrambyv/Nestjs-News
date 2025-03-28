import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/shared/decorator/role.decorator";
import { UserRole } from "../user/user.types";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, memoryStorage } from "multer";
import { extname, join } from "path";
import * as crypto from 'crypto';
import { ALLOWED_IMAGE_EXTENSIONS, ALLOWED_IMAGE_MIME_TYPES } from "./upload.types";
import { ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { OrderedBulkOperation } from "typeorm";
import { FileUploadDto } from "./dto/upload-file.dto";
import { UploadService } from "./upload.service";

@Controller('upload')
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
export class UploadController {
    constructor(private uploadService: UploadService) { }
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: join(__dirname, "../../../uploads"),
            filename(req, file, callback) {
                let ext = extname(file.originalname)
                let filename = crypto.randomBytes(36).toString('hex');
                callback(null, `${filename}${ext}`);
            },
        }),
        fileFilter(req, file, callback) {
            let ext = extname(file.originalname).toLowerCase().slice(1);
            let mimeType = file.mimetype;

            if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType) || ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
                return callback(new BadRequestException("File format or type is not suitable"), false)
            }

            callback(null, true);
        },
        limits: {
            fileSize: 5e6,
        }
    }),
    )
    uploadFile(@UploadedFile('file') file: Express.Multer.File) {
        return {
            message: "File is uploaded succesfully",
            url: `/uploads/${file.filename}`,
        }
    }

    @Post('cloud')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto })
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        fileFilter(req, file, callback) {
            let ext = extname(file.originalname).toLowerCase().slice(1);
            let mimeType = file.mimetype;

            if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType) || ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
                return callback(new BadRequestException("File format or type is not suitable"), false)
            }

            callback(null, true);
        },
        limits: {
            fileSize: 5e6,
        }
    }),
    )
    uploadToCloud(@UploadedFile('file') file: Express.Multer.File) {
        return this.uploadService.uploadToCloud(file);
    }
}